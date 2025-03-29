    import React, { useEffect } from 'react';
    import Tag from './section1/Tag';
    import gsap from 'gsap';

    const Section1 = () => {
        useEffect(() => {
            gsap.fromTo(
                'section',
                { y: '100%', opacity: 0 },
                {
                    y: '0%',
                    opacity: 1,
                    ease: 'power3.out',
                }
            );
            gsap.fromTo(
                '.tag',
                { width: '0px' },
                {
                    width: 'auto',
                    ease: 'power3.out',
                }
            );
            gsap.fromTo(
                '.icon',
                { y: '100%', opacity: 0 },
                {
                    y: '0%',
                    opacity: 1,
                    ease: 'power3.out',
                    delay: 0.5,
                }
            );
            const tags = document.querySelectorAll('.tag');
            const handleMouseMove = (e: MouseEvent) => {
                const { clientX, clientY } = e;
                tags.forEach((tag, index) => {
                    const intensityMap = [0.01, 0.02, 0.03, 0.04, 0.02]; 
                    const randomXFactor = Math.random() * 0.04 - 0.02 + intensityMap[index];
                    const randomYFactor = Math.random() * 0.04 - 0.02 + intensityMap[index];

                    gsap.to(tag, {
                        x: (clientX - window.innerWidth / 2) * randomXFactor,
                        y: (clientY - window.innerHeight / 2) * randomYFactor,
                        duration: 0.5,
                        ease: 'power1.out',
                    });
                });
            };
            window.addEventListener('mousemove', handleMouseMove);

            return () => {
                window.removeEventListener('mousemove', handleMouseMove);
            };
        }, []);
        return (
            <section className="h-[50vh] relative">
                <div className="absolute w-full h-full top-0 left-0 flex items-end">
                    <div>
                        <Tag
                            color="#F5FAC8"
                            className="tag bottom-[350px] left-1/2 ml-[-30px] right-auto top-auto md:bottom-auto md:left-auto md:ml-0 md:right-[45vw] md:top-[7vw]"
                        >
                            대한민국, 서울
                        </Tag>
                        <Tag
                            color="#FFD0C7"
                            className="tag bottom-[320px] left-1/2 ml-[-130px] right-auto top-auto md:bottom-auto md:left-auto md:ml-0 md:right-[55vw] md:top-[9vw]"
                        >
                            김미선
                        </Tag>
                        <Tag
                            color="#A5F0E4"
                            className="tag bottom-[250px] left-1/2 ml-0 right-auto top-auto md:bottom-auto md:left-auto md:ml-0 md:right-[17vw] md:top-[10vw]"
                        >
                            FRONTEND DEVELOPER
                        </Tag>
                        <Tag
                            color="#82C7EB"
                            className="tag bottom-[275px] left-1/2 ml-[-70px] right-auto top-auto md:bottom-auto md:left-auto md:ml-0 md:right-[14vw] md:top-[8vw]"
                        >
                            Creative & Reasonable
                        </Tag>
                        <Tag
                            color="#8EA1F0"
                            className="tag bottom-[228px] left-1/2 ml-[90px] right-auto top-auto md:bottom-auto md:left-auto md:ml-0 md:right-[19vw] md:top-[12vw]"
                        >
                            29
                        </Tag>
                    </div>
                    <div className="flex flex-col p-4 md:flex-row md:justify-between md:w-full md:items-end">
                        <p className="text-[36px] font-primaryBold text-left md:text-[64px]">
                            뛰어난 문제해결 능력을 가진 협동심이 좋은 창의적인
                        </p>
                        <img src="/mouse.svg" className="w-12 icon" />
                        <p className="text-[36px] font-primaryBold text-left md:text-[64px]">
                            프론트엔드 개발자
                        </p>
                    </div>
                </div>
            </section>
        );
    };

    export default Section1;
