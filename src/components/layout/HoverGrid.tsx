'use client';

import { useEffect, useRef } from 'react';

const DOT_SPACING = 9;
const DOT_RADIUS = 0.5;
const HOVER_RADIUS = 260;

const HoverGrid = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = window.innerWidth;
        let height = window.innerHeight;
        let dpr = Math.min(window.devicePixelRatio, 2);

        const resize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            dpr = Math.min(window.devicePixelRatio, 2);
            canvas.width = width * dpr;
            canvas.height = height * dpr;
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        };
        resize();
        window.addEventListener('resize', resize);

        const mouse = { x: -9999, y: -9999 };
        const handleMouseMove = (e: MouseEvent) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        };
        const handleMouseLeave = () => {
            mouse.x = -9999;
            mouse.y = -9999;
        };
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseleave', handleMouseLeave);

        const pink = { r: 255, g: 20, b: 202 };
        const purple = { r: 124, g: 77, b: 255 };

        const dotMix = (col: number, row: number) => {
            const seed = Math.sin(col * 12.9898 + row * 78.233) * 43758.5453;
            return seed - Math.floor(seed);
        };

        let rafId: number;
        const draw = () => {
            ctx.clearRect(0, 0, width, height);

            const startCol = Math.max(0, Math.floor((mouse.x - HOVER_RADIUS) / DOT_SPACING));
            const endCol = Math.min(Math.ceil(width / DOT_SPACING), Math.ceil((mouse.x + HOVER_RADIUS) / DOT_SPACING));
            const startRow = Math.max(0, Math.floor((mouse.y - HOVER_RADIUS) / DOT_SPACING));
            const endRow = Math.min(Math.ceil(height / DOT_SPACING), Math.ceil((mouse.y + HOVER_RADIUS) / DOT_SPACING));

            for (let col = startCol; col <= endCol; col++) {
                for (let row = startRow; row <= endRow; row++) {
                    const x = col * DOT_SPACING;
                    const y = row * DOT_SPACING;
                    const dx = x - mouse.x;
                    const dy = y - mouse.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist > HOVER_RADIUS) continue;

                    const t = 1 - dist / HOVER_RADIUS;
                    const alpha = t * t;
                    const mix = dotMix(col, row);
                    const r = pink.r + (purple.r - pink.r) * mix;
                    const g = pink.g + (purple.g - pink.g) * mix;
                    const b = pink.b + (purple.b - pink.b) * mix;

                    ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
                    ctx.beginPath();
                    ctx.arc(x, y, DOT_RADIUS, 0, Math.PI * 2);
                    ctx.fill();
                }
            }

            rafId = requestAnimationFrame(draw);
        };
        draw();

        return () => {
            cancelAnimationFrame(rafId);
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    return <canvas ref={canvasRef} className="fixed inset-0 -z-10 pointer-events-none" />;
};

export default HoverGrid;
