import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Section5 = () => {
    const sectionRef = useRef(null);
    const gridRef = useRef(null);
    const picList = [
        { id: 1, src: '/image1.png' },
        { id: 2, src: '/image2.png' },
        { id: 3, src: '/image3.png' },
        { id: 4, src: '/image4.png' },
        { id: 5, src: '/image5.png' },
        { id: 6, src: '/image6.png' },
        { id: 7, src: '/image7.png' },
        { id: 8, src: '/image8.png' },
        { id: 9, src: '/image9.png' },
        { id: 10, src: '/image10.png' },
        { id: 11, src: '/image11.png' },
        { id: 12, src: '/image12.png' },
        { id: 13, src: '/image13.png' },
        { id: 14, src: '/image14.png' },
        { id: 15, src: '/image15.png' },
        { id: 16, src: '/image16.png' },
        { id: 17, src: '/image17.png' },
        { id: 18, src: '/image18.png' },
        { id: 19, src: '/image19.png' },
        { id: 20, src: '/image20.png' },
        { id: 21, src: '/image21.png' },
        { id: 22, src: '/image22.png' },
        { id: 23, src: '/image23.png' },
        { id: 24, src: '/image24.png' },
        { id: 25, src: '/image25.png' },
    ];

    useEffect(() => {
        const section = sectionRef.current;
        const grid = gridRef.current;

        // 구 형태의 좌표 계산 함수
        const createSphericalLayout = (radius = 1) => {
            const points = [];
            const count = picList.length;
            const goldenRatio = (1 + Math.sqrt(5)) / 2;
            const angleIncrement = Math.PI * goldenRatio;

            for (let i = 0; i < count; i++) {
                const t = i / count;
                const inclination = Math.acos(1 - 2 * t);
                const azimuth = angleIncrement * i;

                const x = radius * Math.sin(inclination) * Math.cos(azimuth);
                const y = radius * Math.sin(inclination) * Math.sin(azimuth);
                const z = radius * Math.cos(inclination);

                points.push({ x, y, z });
            }

            return points;
        };

        const spherePoints = createSphericalLayout(1.5);

        // ScrollTrigger 애니메이션
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: section,
                start: 'top top',
                end: '+=2000px', // 스크롤을 길게 설정해서 더 오래 지속
                scrub: 20,
                pin: true,
                markers: true,
            },
        });

        // 이미지들 애니메이션
        const images = grid.querySelectorAll('img');
        images.forEach((img, index) => {
            const point = spherePoints[index];

            // 등장 애니메이션
            tl.fromTo(
                img,
                {
                    scale: 0,
                    x: 0,
                    y: 0,
                    opacity: 0,
                },
                {
                    scale: 1,
                    x: point.x * 300,
                    y: point.y * 300,
                    opacity: 1,
                    duration: 2,
                    ease: 'power2.inOut',
                    stagger: 0.1, // 하나씩 순차적으로 등장
                },
                0 // 동시에 시작
            );

            // 사라지는 애니메이션 추가
            tl.to(
                img,
                {
                    scale: 2, // 커지면서
                    opacity: 0, // 점점 사라짐
                    duration: 1.5,
                    ease: 'power2.inOut',
                    stagger: 0.1, // 순차적으로 사라지게
                },
                '+=1' // 일정 시간 후 사라지기 시작
            );
        });
    }, []);
    return (
        <div ref={sectionRef} className="relative w-screen h-screen overflow-hidden ">
            <ul
                ref={gridRef}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                           grid grid-cols-6 gap-4 place-items-center"
            >
                {picList.map((pic) => (
                    <li key={pic.id} className="w-[100px] h-[100px]">
                        <img
                            src={pic.src}
                            alt="pic"
                            className="w-full h-full object-cover opacity-0"
                        />
                    </li>
                ))}
            </ul>
            <div className="w-[300px] h-[300px] sm:w-[450px] sm:h-[450px] md:w-[650px] md:h-[650px] bg-black opacity-50 absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] flex flex-col gap-[65px] justify-center items-center text-center p-[40px] text-white">
                <div className="text-[14px] sm:text-[20px] md:text-[24px]">
                    <p>Redux를 활용한</p>
                    <p>효율적인 상태관리</p>
                </div>
                <div className="flex items-center justify-between w-full">
                    <img
                        src="/react.png"
                        className="w-[80px] h-[80px] sm:w-[165px] sm:h-[165px] md:w-[240px] md:h-[240px]"
                    />
                    <div className="text-[32px] sm:text-[48px] md:text-[64px] font-primaryBold flex flex-col h-full justify-between">
                        <p>기획부터</p>
                        <p>배포까지</p>
                    </div>
                </div>
                <div className="text-[14px] sm:text-[20px] md:text-[24px]">
                    <p>
                        React와 Next.js로 빠르고
                        <br /> 최적화된 웹을 개발합니다.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Section5;
