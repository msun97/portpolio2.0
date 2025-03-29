import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Section4 = () => {
    const sectionRef = useRef(null);
    const textRefs = {
        line1: useRef(null),
        line2: useRef(null),
        line3: useRef(null),
    };

    useEffect(() => {
        const section = sectionRef.current;

        // GSAP timeline for scroll animations
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: section,
                start: 'center center', // 섹션의 중간이 뷰포트 중앙에 왔을 때 시작
                end: 'bottom bottom',
                pin: true,
                scrub: 3,
            },
        });

        // Animate each line sequentially with left-to-right fill
        Object.values(textRefs).forEach((ref) => {
            tl.fromTo(
                ref.current,
                {
                    backgroundImage: 'linear-gradient(to right, transparent 0%, transparent 100%)',
                    backgroundClip: 'text',
                    webkitBackgroundClip: 'text',
                    color: 'white',
                    WebkitTextStroke: '3px #A100FF',
                },
                {
                    backgroundImage: 'linear-gradient(to right, #A100FF 100%, #A100FF 100%)',
                    backgroundClip: 'text',
                    webkitBackgroundClip: 'text',
                    color: 'transparent',
                    WebkitTextStroke: '0px',
                    duration: 1,
                }
            );
        });

        // Cleanup
        return () => {
            tl.kill();
        };
    }, []);

    return (
        <div
            ref={sectionRef}
            className="w-screen font-design h-screen flex justify-center items-center relative"
        >
            <div className="w-full h-full">
                <div className="mx-[-10px] text-white text-[clamp(10px,15vw,250px)] w-full text-nowrap">
                    <div
                        ref={textRefs.line1}
                        className="mb-4"
                        style={{ WebkitTextStroke: '3px #A100FF' }}
                    >
                        기술과 창의성이 만
                    </div>
                    <div className="flex justify-between items-center mb-4">
                        <div ref={textRefs.line2} style={{ WebkitTextStroke: '3px #A100FF' }}>
                            나는 지점
                        </div>
                        <div
                            className="text-[20px] sm:text-[clamp(10px,2vw,32px)] md:text-[clamp(10px,2vw,48px)] text-[#7C5983] font-primaryBold text-wrap"
                            style={{ WebkitTextStroke: '0px' }}
                        >
                            <p className="font-primaryRegular">웹은 단순한 화면이 아닙니다.</p>
                            <p className="text-[20px] sm:text-[clamp(16px,3vw,48px)] md:text-[64px]">
                                사용자와 소통하는 공간입니다.
                            </p>
                        </div>
                    </div>
                    <div ref={textRefs.line3} style={{ WebkitTextStroke: '3px #A100FF' }}>
                        에서 새로운 경험을
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Section4;
