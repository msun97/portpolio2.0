import React, { useEffect, useRef } from 'react';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Section2 = () => {
    const sectionRef = useRef<HTMLDivElement | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const text1Ref = useRef<HTMLParagraphElement | null>(null);
    const text2Ref = useRef<HTMLParagraphElement | null>(null);
    const text3Ref = useRef<HTMLParagraphElement | null>(null);
    const text4Ref = useRef<HTMLParagraphElement | null>(null);
    const text5Ref = useRef<HTMLParagraphElement | null>(null);
    const text6Ref = useRef<HTMLParagraphElement | null>(null);
    const contactRef = useRef<HTMLParagraphElement | null>(null);
    const line1Ref = useRef<HTMLParagraphElement | null>(null);
    const line2Ref = useRef<HTMLParagraphElement | null>(null);
    const line3Ref = useRef<HTMLParagraphElement | null>(null);

    useEffect(() => {
        ScrollTrigger.getAll().forEach((t) => t.kill());

        if (!sectionRef.current || !containerRef.current || !text1Ref.current || !text2Ref.current)
            return;
        const ctx = gsap.context(() => {
            const introAnimation = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top top',
                    end: 'top+=100 top',
                    toggleActions: 'play none none reverse',
                },
            });

            introAnimation
                .fromTo(text1Ref.current, { y: 100 }, { y: 0, duration: 1, ease: 'power2.out' })
                .fromTo(
                    text2Ref.current,
                    { y: -100 },
                    { y: 0, duration: 1, ease: 'power2.out' },
                    0
                );

            const outroAnimation = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top+=200 top',
                    end: 'bottom bottom',
                    scrub: 5,
                },
            });

            outroAnimation
                .to(text1Ref.current, { y: 100, duration: 12, ease: 'power2.in' })
                .to(text2Ref.current, { y: -100, duration: 12, ease: 'power2.in' }, 0)
                .to(
                    text3Ref.current,
                    {
                        y: -100,
                        duration: 12,
                        ease: 'power2.in',
                    },
                    0
                )
                .to(
                    text4Ref.current,
                    {
                        y: -100,
                        duration: 12,
                        ease: 'power2.in',
                    },
                    0
                )
                .to(
                    line1Ref.current,
                    {
                        width: '00%',
                        duration: 12,
                        ease: 'power2.in',
                    },
                    0
                )
                .to(
                    line2Ref.current,
                    {
                        height: '0%',
                        duration: 12,
                        ease: 'power2.in',
                    },
                    0
                )
                .fromTo(
                    line3Ref.current,
                    {
                        width: '0%',
                    },
                    {
                        width: '50%',
                        duration: 12,
                        ease: 'power2.out',
                    }
                );

            const thirdAnimation = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top+=300 top',
                    end: 'bottom bottom',
                    scrub: 10,
                },
            });

            thirdAnimation
                .fromTo(
                    text5Ref.current,
                    {
                        x: -1000,
                        opacity: 0,
                    },
                    {
                        x: 0,
                        opacity: 1,
                        duration: 20,
                        ease: 'power2.out',
                    }
                )
                .fromTo(
                    text6Ref.current,
                    {
                        x: -1000,
                        opacity: 0,
                    },
                    {
                        x: 0,
                        opacity: 1,
                        duration: 20,
                        ease: 'power2.out',
                    }
                )
                .fromTo(
                    contactRef.current,
                    {
                        y: -1000,
                        opacity: 0,
                    },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 20,
                        ease: 'power2.out',
                    }
                );

            ScrollTrigger.create({
                trigger: containerRef.current,
                start: 'top top',
                end: () => `+=${containerRef.current?.offsetHeight || 0}`,
                pin: true,
                pinSpacing: false,
                anticipatePin: 1,
                invalidateOnRefresh: true,
                markers: false,
            });
        });

        return () => {
            ctx.revert();
            ScrollTrigger.getAll().forEach((t) => t.kill());
        };
    }, []);

    return (
        <div ref={sectionRef} className="relative w-dvw h-[200vh]">
            <div ref={containerRef} className="sticky top-0 w-full h-screen">
                <video autoPlay muted loop className="w-screen h-screen object-cover">
                    <source src="/main1.mp4" type="video/mp4" />
                    Your browser is not supported!
                </video>
                <div className="absolute top-0 left-0 w-full h-screen px-8 flex flex-col justify-between items-center">
                    <div className="mt-[210px] text-white opacity-60 text-[32px] sm:text-[58px] md:text-[95px] font-primaryBold w-full md:w-[80%] ">
                        <div className="overflow-hidden h-fit text-nowrap">
                            <p ref={text1Ref}>디자인을 이해하는 개발자</p>
                        </div>
                        <div className="flex w-full justify-end overflow-hidden h-fit text-nowrap">
                            <p ref={text2Ref}>개발을 아는 디자이너.</p>
                        </div>
                    </div>
                    <div className="text-white font-primaryBold text-[24px] sm:text-[32px] md:text-[48px] mb-[150px] text-center">
                        <div className="overflow-hidden h-fit text-nowrap  relative z-5">
                            <p ref={text3Ref}>세련된 코드, 감각적인 UI</p>
                        </div>
                        <div className="overflow-hidden h-fit text-nowrap  relative z-5">
                            <p ref={text4Ref}>최고의 사용자 경험을 만듭니다.</p>
                        </div>
                        <div
                            ref={line1Ref}
                            className="absolute line-vertical w-[40%] h-[1px] bg-white bottom-[120px] sm:bottom-[100px] md:bottom-[95px] left-1/2 translate-x-[-50%] opacity-20"
                        />
                        <div
                            ref={line2Ref}
                            className="absolute line-horizontal w-[1px] h-[120px] sm:h-[180px] md:h-[210px] bg-white bottom-[120px] sm:bottom-[100px] md:bottom-[95px] left-1/2 opacity-20"
                        />
                        <div
                            ref={line3Ref}
                            className="absolute line-vertical w-[40%] h-[1px] bg-white bottom-[120px] sm:bottom-[150px] md:bottom-[200px] left-1/2 translate-x-[-50%] opacity-20"
                        />
                    </div>
                </div>
                <div className="absolute top-0 left-0 w-full h-screen px-8">
                    <div className="mt-[40px] text-white text-right text-[26px] sm:text-[32px] md:text-[40px] font-primaryBold w-full">
                        <div className="overflow-hidden h-fit text-nowrap  relative z-5">
                            <p ref={text5Ref}>매력적인 인터페이스와</p>
                        </div>
                        <div className="overflow-hidden h-fit text-nowrap  relative z-5">
                            <p ref={text6Ref}>부드러운 인터랙션을 구현합니다</p>
                        </div>
                    </div>
                    <div
                        className="h-screen flex flex-col gap-10 justify-center items-center text-white text-center  font-primaryBold w-full"
                        ref={contactRef}
                    >
                        <p className="text-[56px] sm:text-[58px] md:text-[95px]">FRONT-END</p>
                        <div className="border border-white rounded-[20px] px-5 py-[10px]">
                            <a
                                href="/contact"
                                className="text-[14px] sm:text-[17px] md:text-[20px]"
                            >
                                CONTACT ME
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Section2;
