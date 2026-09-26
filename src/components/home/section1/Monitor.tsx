'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';

const BASE_ROTATION_Y = -Math.PI * 0.22;

const hologramShader = {
    uniforms: {
        tDiffuse: { value: null },
        resolution: { value: new THREE.Vector2(1, 1) },
        dotSize: { value: 5.0 },
        splitOffset: { value: 10.0 },
    },
    vertexShader: `
        varying vec2 vUv;
        void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
    `,
    fragmentShader: `
        uniform sampler2D tDiffuse;
        uniform vec2 resolution;
        uniform float dotSize;
        uniform float splitOffset;
        varying vec2 vUv;

        float dotLuminance(vec3 c) {
            return dot(c, vec3(0.299, 0.587, 0.114));
        }

        float dotMask(vec2 fragCoord, float lum) {
            vec2 cell = mod(fragCoord, dotSize) - dotSize * 0.5;
            float radius = mix(0.0, 0.62, pow(lum, 0.55)) * dotSize;
            return 1.0 - smoothstep(radius - 1.0, radius, length(cell));
        }

        void main() {
            vec2 fragCoord = vUv * resolution;
            vec2 dx = vec2(splitOffset / resolution.x, 0.0);

            vec3 leftSample = texture2D(tDiffuse, vUv + dx).rgb;
            vec3 rightSample = texture2D(tDiffuse, vUv - dx).rgb;

            float lumLeft = dotLuminance(leftSample);
            float lumRight = dotLuminance(rightSample);

            float maskLeft = dotMask(fragCoord, lumLeft);
            float maskRight = dotMask(fragCoord + vec2(dotSize * 0.5), lumRight);

            vec3 green = vec3(0.16, 1.0, 0.45);
            vec3 purple = vec3(0.7, 0.25, 1.0);

            vec3 color = green * maskLeft + purple * maskRight;
            float alpha = clamp(maskLeft + maskRight, 0.0, 1.0);
            gl_FragColor = vec4(min(color, vec3(1.0)), alpha);
        }
    `,
};

const Monitor = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const width = container.clientWidth;
        const height = container.clientHeight;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(35, width / height, 0.1, 100);
        camera.position.set(0, 0, 5);

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setClearColor(0x000000, 0);
        container.appendChild(renderer.domElement);

        scene.add(new THREE.AmbientLight(0xffffff, 0.35));
        const keyLight = new THREE.DirectionalLight(0xffffff, 2.2);
        keyLight.position.set(3, 4, 5);
        scene.add(keyLight);
        const fillLight = new THREE.DirectionalLight(0xffffff, 0.4);
        fillLight.position.set(-4, -2, 3);
        scene.add(fillLight);

        const pixelRatio = renderer.getPixelRatio();
        const composer = new EffectComposer(renderer);
        composer.addPass(new RenderPass(scene, camera));
        const holoPass = new ShaderPass(hologramShader);
        holoPass.uniforms.resolution.value.set(width * pixelRatio, height * pixelRatio);
        composer.addPass(holoPass);

        let model: THREE.Object3D | null = null;

        const loader = new GLTFLoader();
        loader.load('/2026/monitor.glb', (gltf) => {
            model = gltf.scene;

            const box = new THREE.Box3().setFromObject(model);
            const size = new THREE.Vector3();
            box.getSize(size);
            const center = new THREE.Vector3();
            box.getCenter(center);

            const boundingDiagonal = size.length();
            const scale = 2.38 / boundingDiagonal;
            model.scale.setScalar(scale);
            model.position.copy(center).multiplyScalar(-scale);
            model.rotation.y = BASE_ROTATION_Y;

            scene.add(model);
        });

        const target = { x: 0, y: 0 };
        const current = { x: 0, y: 0 };

        const handleMouseMove = (e: MouseEvent) => {
            target.x = (e.clientX / window.innerWidth) * 2 - 1;
            target.y = (e.clientY / window.innerHeight) * 2 - 1;
        };
        window.addEventListener('mousemove', handleMouseMove);

        let rafId: number;
        const animate = () => {
            current.x += (target.x - current.x) * 0.05;
            current.y += (target.y - current.y) * 0.05;

            if (model) {
                model.rotation.y = BASE_ROTATION_Y + current.x * 0.3;
                model.rotation.x = current.y * 0.15;
            }

            composer.render();
            rafId = requestAnimationFrame(animate);
        };
        animate();

        const handleResize = () => {
            const w = container.clientWidth;
            const h = container.clientHeight;
            camera.aspect = w / h;
            camera.updateProjectionMatrix();
            renderer.setSize(w, h);
            composer.setSize(w, h);
            holoPass.uniforms.resolution.value.set(w * pixelRatio, h * pixelRatio);
        };
        window.addEventListener('resize', handleResize);

        return () => {
            cancelAnimationFrame(rafId);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('resize', handleResize);
            composer.dispose();
            renderer.dispose();
            container.removeChild(renderer.domElement);
        };
    }, []);

    return <div ref={containerRef} className="w-full h-full" />;
};

export default Monitor;
