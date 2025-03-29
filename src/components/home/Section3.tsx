import React, { useEffect, useState, useRef, useMemo } from 'react';
import Tag from './section1/Tag';
import gsap from 'gsap';

const Section3 = () => {
    const [selectedValue, setSelectedValue] = useState('뛰어난 문제해결');
    const tagRefs = useRef({});
    const animationTriggerRef = useRef(0);

    const contentMap = {
        '뛰어난 문제해결': {
            id: 1,
            text: '프로젝트를 진행하며 예상치 못한 오류를 마주할 때, 해결방안을 찾는 것에 성취감을 느낍니다.',
            subText:
                '논리적인 사고와 창의적인 접근법을 바탕으로 인내심을 가지고 해결방안을 찾아냅니다.',
            tags: [
                { label: '문제 해결', color: '#22D1EE', isWhite: false },
                { label: '논리적 사고', color: '#3D5AF1', isWhite: true },
                { label: '코드 최적화', color: '#E2F3F5', isWhite: false },
            ],
        },
        창의적인: {
            id: 2,
            text: '단순히 기능을 구현하는 것을 넘어 GSAP을 활용한 인터랙션 애니메이션을 적용하여 직관적인 사용자 경험을 제공합니다.',
            subText: '기술과 디자인을 결합한 창의적인 솔루션을 제시합니다.',
            tags: [
                { label: '창의적인 문제 해결', color: '#393E46', isWhite: true },
                { label: '인터랙션 디자인', color: '#00ADB5', isWhite: true },
                { label: '사용자 경험', color: '#AAD8D3', isWhite: false },
            ],
        },
        계획적인: {
            id: 3,
            text: '프로젝트를 진행할 때, 명확한 로드맵을 설정하고 우선순위를 정해 단계적으로 해결해 나갑니다.',
            subText:
                '작업 일정을 세분화하고, Git을 활용한 협업 프로세스를 정립하여 효율적인 개발을 이끌어 나갑니다.',
            tags: [
                { label: '효율적인 개발', color: '#F6EDCF', isWhite: false },
                { label: '체계적인 계획', color: '#DAF1F9', isWhite: false },
            ],
        },
    };
    const values = Object.keys(contentMap);

    useEffect(() => {
        const interval = setInterval(() => {
            setSelectedValue((prevValue) => {
                const currentIndex = values.indexOf(prevValue);
                const nextIndex = (currentIndex + 1) % values.length;
                return values[nextIndex];
            });
        }, 4000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        // Increment the animation trigger ref whenever the value changes
        animationTriggerRef.current += 1;

        const handleMouseMove = (e) => {
            const { clientX, clientY } = e;
            contentMap[selectedValue].tags.forEach((tag, index) => {
                const tagElement = tagRefs.current[tag.label];
                if (tagElement) {
                    const intensityMap = [0.01, 0.03, 0.02];
                    const randomXFactor = Math.random() * 0.04 - 0.02 + intensityMap[index];
                    const randomYFactor = Math.random() * 0.04 - 0.02 + intensityMap[index];

                    gsap.to(tagElement, {
                        x: (clientX - window.innerWidth / 2) * randomXFactor,
                        y: (clientY - window.innerHeight / 2) * randomYFactor,
                        duration: 0.5,
                        ease: 'power1.out',
                    });
                }
            });
        };

        // Clear previous animations before starting new ones
        gsap.killTweensOf('.fade-in');
        gsap.killTweensOf('.tag');

        // Restart animations with a slight delay to ensure clean start
        setTimeout(() => {
            gsap.fromTo(
                '.fade-in',
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    ease: 'power2.out',
                    stagger: 0.1,
                    // Add a unique key to force re-animation
                    data: animationTriggerRef.current,
                }
            );

            gsap.fromTo(
                '.tag',
                { width: '0px' },
                {
                    width: 'auto',
                    ease: 'power3.out',
                    // Add a unique key to force re-animation
                    data: animationTriggerRef.current,
                }
            );
        }, 50);

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, [selectedValue]);

    // Rest of the component remains the same
    const randomPositions = useMemo(() => {
        return contentMap[selectedValue].tags.map(() => ({
            bottom: Math.random() * 800 + 200,
            left: Math.random() * 50 - 10,
            marginLeft: Math.random() * 40 - 20,
        }));
    }, [selectedValue]);

    return (
        <div className="w-screen h-screen flex flex-col py-2 justify-center sm:flex-row sm:justify-between items-center px-8">
            <div className="flex flex-col gap-[58px] text-[20px] sm:text-[32px]">
                <div className="flex gap-[55px]">
                    <p className="font-primaryBold">My</p>
                    <p className="font-primaryBold flex flex-col gap-5">
                        Values
                        <ul className="font-primaryRegular text-[14px] sm:text-[20px] flex sm:flex-col gap-5">
                            {Object.keys(contentMap).map((value) => (
                                <li
                                    key={value}
                                    className={`cursor-pointer ${
                                        selectedValue === value ? '' : 'opacity-50'
                                    }`}
                                    onClick={() => setSelectedValue(value)}
                                >
                                    {value}
                                </li>
                            ))}
                        </ul>
                    </p>
                </div>

                <div className="hidden sm:flex gap-[60px] sm:gap-[80px]">
                    <svg
                        width="24px"
                        height="24px"
                        viewBox="0 0 40 40"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <circle cx="20" cy="20" r="18" stroke="#D3D3D3" stroke-width="3" />
                        <circle
                            cx="20"
                            cy="20"
                            r="18"
                            stroke="black"
                            stroke-width="3"
                            stroke-dasharray="113"
                            stroke-dashoffset="113"
                            fill="none"
                            stroke-linecap="round"
                            className="animate-fillCircle"
                        />
                    </svg>

                    <p className="text-[16px]">{contentMap[selectedValue].id}-3</p>
                </div>
            </div>

            <div className="flex flex-col justify-between h-fit gap-40 sm:h-full w-full py-10 sm:w-[50%] md:w-[40%] sm:py-30 relative fade-in">
                <div className="text-[20px] sm:text-[42px] md:text-[64px] font-primaryBold">
                    {contentMap[selectedValue].text}
                </div>
                <div className="flex gap-[6px] items-start sm:text-[16px] md:text-[18px]">
                    <img src="/corner-down-right.svg" className="sm:w-4 sm:h-4 md:w-6 md:h-6" />
                    <p>{contentMap[selectedValue].subText}</p>
                </div>

                <div className="absolute w-full h-screen z-10">
                    {contentMap[selectedValue].tags.map((tag, index) => (
                        <Tag
                            key={tag.label}
                            color={tag.color}
                            ref={(el) => (tagRefs.current[tag.label] = el)}
                            style={{
                                position: 'absolute',
                                bottom: `${randomPositions[index].bottom}px`,
                                left: `${randomPositions[index].left}vw`,
                                marginLeft: `${randomPositions[index].marginLeft}px`,
                            }}
                            className={`${tag.isWhite ? 'text-white' : 'text-black'} tag`}
                        >
                            {tag.label}
                        </Tag>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Section3;
