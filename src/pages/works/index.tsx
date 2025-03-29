import WorkList from '@/components/works/WorkList';
import gsap from 'gsap';
import { useEffect, useRef } from 'react';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger); // ScrollTrigger 플러그인 등록
const Works = () => {
    useEffect(() => {
        const text = document.querySelector('.your-selector') as HTMLElement;
        const chars = text.innerText.split('');
        text.innerHTML = ''; // 원래 텍스트를 지움

        chars.forEach((char) => {
            const span = document.createElement('span');
            span.innerText = char; // 각 글자를 span으로 감싸기
            text.appendChild(span);
        });

        gsap.fromTo(
            '.title span', // 각각의 글자에 대해 애니메이션을 적용
            {
                y: (i) => (i % 2 === 0 ? '-1000%' : '1000%'),
            },
            {
                y: 0, // 홀수는 아래에서 위로, 짝수는 위에서 아래로
                stagger: 0.1, // 글자가 하나씩 차례대로 애니메이션되도록 설정
                ease: 'power3.out',
            }
        );
        const titleChars = document.querySelectorAll('.title span');

        titleChars.forEach((char) => {
            char.addEventListener('mouseenter', () => {
                // 글자가 위로 올라가게
                gsap.to(char, {
                    y: '-1000px', // 위로 올라가도록
                    duration: 1,
                    ease: 'power3.out',
                    onComplete: () => {
                        // 글자가 위로 올라가면, 아래에서 다시 등장하게
                        gsap.to(char, {
                            y: '1000px', // 아래에서 등장
                            duration: 0.01,
                            ease: 'power3.out',
                            onComplete: () => {
                                gsap.to(char, {
                                    y: '0px', // 원래 위치로 돌아가도록
                                    duration: 1,
                                    ease: 'power3.out',
                                });
                            },
                        });
                    },
                });
            });
        });
    }, []);

    const subtitleRef = useRef<HTMLDivElement | null>(null);
    const text1Ref = useRef<HTMLParagraphElement | null>(null);
    const text2Ref = useRef<HTMLParagraphElement | null>(null);
    useEffect(() => {
        if (!subtitleRef.current || !text1Ref.current || !text2Ref.current) return;
        const subani = gsap.timeline({
            scrollTrigger: {
                trigger: subtitleRef.current,
                start: 'top top',
                end: 'bottom+=500 top',
                scrub: 1,
                pin: true,
            },
        });
        subani
            .fromTo(
                text1Ref.current,
                {
                    y: -500,
                },
                {
                    y: 0,
                    duration: 1,
                    ease: 'power2.out',
                }
            )
            .fromTo(
                text2Ref.current,
                {
                    y: -500,
                },
                {
                    y: 0,
                    duration: 1,
                    ease: 'power2.out',
                }
            );
        return () => {
            if (subani.scrollTrigger) {
                subani.scrollTrigger.kill();
            }
            subani.kill();
        };
    }, []);
    const workListRef1 = useRef<HTMLDivElement | null>(null);
    const workListRef2 = useRef<HTMLDivElement | null>(null);
    const workListRef3 = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
        // workListRef1에 대한 scrollTrigger 설정
        gsap.fromTo(
            workListRef1.current,
            { y: 200 },
            {
                y: 0,
                duration: 1,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: workListRef1.current,
                    start: 'top bottom',
                    end: 'top top',
                    scrub: 1,
                    markers: false, // 디버깅을 위한 마커 추가
                },
            }
        );

        // workListRef2에 대한 scrollTrigger 설정
        gsap.fromTo(
            workListRef2.current,
            { y: 200 },
            {
                y: -200,
                duration: 1,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: workListRef2.current,
                    start: 'top-=500 bottom',
                    end: 'top top',
                    scrub: 1,
                    markers: false,
                },
            }
        );

        // workListRef3에 대한 scrollTrigger 설정
        gsap.fromTo(
            workListRef3.current,
            { y: 200 },
            {
                y: -400,
                duration: 1,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: workListRef3.current,
                    start: 'top-=1000 bottom',
                    end: 'top top',
                    scrub: 1,
                    markers: false,
                },
            }
        );
        ScrollTrigger.refresh();
    }, []);
    return (
        <section className="bg-[#000000] w-full overflow-hidden">
            <div className="absolute h-[100vh] bg-[#000000] z-[-1] bottom-0 w-full" />
            <div className="h-screen flex justify-end items-end">
                <div className="h-[clamp(80px,20vw,125px)]  md:h-[clamp(200px,26vw,500px)] sm:h-[clamp(100px,24vw,250px)] w-screen overflow-hidden text-nowrap">
                    <div className="title text-white text-[clamp(80px,20vw,125px)] md:text-[clamp(200px,26vw,500px)] sm:text-[clamp(100px,24vw,250px)] w-full flex items-end justify-end overflow-hidden font-designTenada">
                        WORKS
                    </div>
                </div>
            </div>
            <div
                className="text-white text-[clamp(30px,8vw,50px)]  sm:text-[clamp(50px,8vw,80px)] md:text-[clamp(80px,7vw,128px)] w-full h-screen flex flex-col justify-end overflow-hidden font-primaryBold"
                ref={subtitleRef}
            >
                <div className="h-fit overflow-hidden text-nowrap">
                    <p ref={text1Ref}>코드를 넘어 사용자의 경험을</p>
                </div>
                <div className="h-fit overflow-hidden text-nowrap">
                    <p ref={text2Ref}>설계합니다.</p>
                </div>
            </div>
            <div className="worklist-container w-screen h-[300vh]">
                <WorkList
                    siteLink="https://project-vancleef.vercel.app/"
                    gitLink="https://github.com/msun97/project-vancleef"
                    imgLink="/works1.jpg"
                    techStack="PhotoShop, Figma, React, Redux, GSAP"
                    num="1"
                    projectSubject="팀 프로젝트02"
                    title="Van Cleef 사이트 리뉴얼"
                    content="하이 쥬얼리 컨셉을 살린 고급스러운 느낌과 명확한 UI를 목표로 진행하였습니다."
                    ref={workListRef1}
                />
                <WorkList
                    siteLink="https://viewee.vercel.app/"
                    gitLink="https://github.com/zio-s/project-viewee"
                    imgLink="/works2.jpg"
                    techStack="PhotoShop, Figma, React, Redux, GSAP"
                    num="2"
                    projectSubject="팀 프로젝트01"
                    title="OTT 사이트 Viewee 제작"
                    content="Redux를 통해 상태관리 및 사용자 데이터 관리를 중점으로 진행하였습니다."
                    ref={workListRef2}
                />
                <WorkList
                    siteLink="https://project1-react-master.vercel.app/"
                    gitLink="https://github.com/msun97/project1--react-master"
                    imgLink="/works3.jpg"
                    techStack="Figma, React, GSAP"
                    num="3"
                    projectSubject="개인 프로젝트01"
                    title="CLIO 코스메틱 홈페이지 리뉴얼"
                    content="React를 통해 컴포넌트를 분리하여 재사용이 쉬운 사이트를 만들고자 했습니다. "
                    ref={workListRef3}
                />
            </div>
        </section>
    );
};

export default Works;
