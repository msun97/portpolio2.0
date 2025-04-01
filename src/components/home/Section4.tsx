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

    // 이 컴포넌트에서 생성한 ScrollTrigger 인스턴스를 추적하기 위한 참조
    const triggersRef = useRef<ScrollTrigger[]>([]);

    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        // 초기 상태 설정 - 텍스트 라인의 초기 스타일 설정
        Object.values(textRefs).forEach((ref) => {
            if (ref.current) {
                gsap.set(ref.current, {
                    backgroundImage: 'linear-gradient(to right, transparent 0%, transparent 100%)',
                    backgroundClip: 'text',
                    webkitBackgroundClip: 'text',
                    color: 'white',
                    WebkitTextStroke: '3px #A100FF',
                });
            }
        });

        // 핀 설정
        const pinTrigger = ScrollTrigger.create({
            trigger: section,
            start: 'top top',
            end: '+=100%',
            pin: true,
            pinSpacing: true,
            anticipatePin: 1,
            markers: false,
            id: 'section4-pin', // ID를 지정하여 나중에 식별하기 쉽게 함
        });

        // 핀 트리거 추적
        triggersRef.current.push(pinTrigger);

        // 애니메이션 타임라인
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: section,
                start: 'top top',
                end: '+=100%',
                scrub: 1,
                markers: false,
                id: 'section4-animation', // ID를 지정하여 나중에 식별하기 쉽게 함
            },
        });

        // 애니메이션 트리거 추적
        if (tl.scrollTrigger) {
            triggersRef.current.push(tl.scrollTrigger);
        }

        // 각 라인별 애니메이션 순차 적용
        tl.to(textRefs.line1.current, {
            backgroundImage: 'linear-gradient(to right, #A100FF 100%, #A100FF 100%)',
            backgroundClip: 'text',
            webkitBackgroundClip: 'text',
            color: 'transparent',
            WebkitTextStroke: '0px',
            duration: 0.3,
            ease: 'power1.inOut',
        })
            .to(
                textRefs.line2.current,
                {
                    backgroundImage: 'linear-gradient(to right, #A100FF 100%, #A100FF 100%)',
                    backgroundClip: 'text',
                    webkitBackgroundClip: 'text',
                    color: 'transparent',
                    WebkitTextStroke: '0px',
                    duration: 0.3,
                    ease: 'power1.inOut',
                },
                '+=0.1'
            )
            .to(
                textRefs.line3.current,
                {
                    backgroundImage: 'linear-gradient(to right, #A100FF 100%, #A100FF 100%)',
                    backgroundClip: 'text',
                    webkitBackgroundClip: 'text',
                    color: 'transparent',
                    WebkitTextStroke: '0px',
                    duration: 0.3,
                    ease: 'power1.inOut',
                },
                '+=0.1'
            );

        // 클린업 함수 - 이 컴포넌트에서 생성한 ScrollTrigger만 정리
        return () => {
            // 타임라인 정리
            if (tl) tl.kill();

            // 이 컴포넌트에서 생성한 ScrollTrigger 인스턴스만 정리
            triggersRef.current.forEach((trigger) => {
                if (trigger) trigger.kill();
            });

            // 참조 배열 초기화
            triggersRef.current = [];
        };
    }, []);

    return (
        <div
            ref={sectionRef}
            className="w-screen font-design h-screen flex justify-center items-center relative"
        >
            <div className="w-full h-full">
                <div className="mx-[-10px] text-white text-[clamp(10px,15vw,250px)] w-full text-nowrap">
                    <div ref={textRefs.line1} className="mb-4">
                        기술과 창의성이 만
                    </div>
                    <div className="flex justify-between items-center mb-4">
                        <div ref={textRefs.line2}>나는 지점</div>
                        <div className="text-[20px] sm:text-[clamp(10px,2vw,32px)] md:text-[clamp(10px,2vw,48px)] text-[#7C5983] font-primaryBold text-wrap">
                            <p className="font-primaryRegular">웹은 단순한 화면이 아닙니다.</p>
                            <p className="text-[20px] sm:text-[clamp(16px,3vw,48px)] md:text-[64px]">
                                사용자와 소통하는 공간입니다.
                            </p>
                        </div>
                    </div>
                    <div ref={textRefs.line3}>에서 새로운 경험을</div>
                </div>
            </div>
        </div>
    );
};

export default Section4;
