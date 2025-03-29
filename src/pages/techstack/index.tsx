import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger); // ScrollTrigger 플러그인 등록
const index = () => {
    const dataList = [
        {
            id: 1,
            number: '(A)',
            title: 'DESIGN',
            content: [
                'UI/UX 디자인을 설계하고, 사용자 중심의 인터페이스를 구현합니다.',
                'Figma를 통해 와이어프레임과 프로토타입을 제작한 경험이 있으며, 팀 협업을 위한 디자인 시스템 구축하였습니다.',
                'Photoshop을 활용한 배너, 제품 상세 이미지을 제작한 경험이 있습니다.',
            ],
            subtitle: '반응형 디자인과 사용자 경험을 최우선으로',
            tacstack: ['PhotoShop', 'Figma'],
        },
        {
            id: 2,
            number: '(B)',
            title: 'FRONTEND',
            content: [
                'HTML5 & CSS을 활용한 웹 표준과 접근성을 고려한 마크업 작성이 가능합니다.',
                'JavaScript 또는 TypeScript을 사용한 동적인 UI 구현을 할 수 있습니다.',
                'React을 통한 효율적인 컴포넌트 기반 개발의 경험이 있으며, 특히 Redux를 사용한 상태 관리 최적화에 자신이 있습니다.',
                'Styled-components을 통한 유지보수성과 확장성을 고려한 구조로 설계한 경험이 있고, Tailwind CSS을 통해 높은 생산성과 일관성 있는 코드 개발이 가능합니다.',
                'GSAP을 활용해 사용자 경험을 극대화하는 인터랙티브 애니메이션을 구현하는 것에 관심이 많아 시각적으로 세련된 웹사이트 제작으로 브랜드 아이덴티티 강화를 한 경험이 있습니다.',
                'Next.js를 사용한 SSR과 최적화 기법을 적용하여 성능 개선이 가능합니다.',
            ],
            subtitle: '완성도 높은 프로젝트를 만듭니다.',
            tacstack: [
                'HTML',
                'CSS',
                'SASS',
                'JS',
                'React',
                'TS',
                'Styled-components',
                'Tailwind CSS',
                'Redux',
                'Next.js',
                'GSAP',
                'Three.js',
            ],
        },
        {
            id: 3,
            number: '(C)',
            title: 'COLLABORATION',
            content: [
                ' Git, Github을 이용하여 협업 환경에서의 코드 버전 관리 및 브랜칭을 통한 효율적인 프로젝트 관리가 가능합니다.',
                'Confluence 등의 툴을 이용하여 프로젝트 문서 정리 및 공유를 통한 작업 흐름 명확화를 하고, 이를 통해 실시간 커뮤니케이션으로 이슈를 빠르게 해결할 수 있습니다.',
            ],
            subtitle: '팀워크를 중요하게 생각하며, 원활한 협업을 이끌어냅니다.',
            tacstack: ['Git', 'Github', 'Confluence', 'Slack'],
        },
        {
            id: 4,
            number: '(D)',
            title: 'Cloud/Server',
            content: [
                'Google Firebase를 활용해 서버리스 환경에서 효율적인 백엔드를 구축한 경험이 있습니다.',
                '특히 Authentication을 사용한 소셜 로그인 기능 구현을 하였습니다.',
            ],
            subtitle: '빠르게 성장하고, 끊임없이 배우는 개발자가 되겠습니다.',
            tacstack: ['Google Firebase', 'Authentication'],
        },
    ];

    return (
        <section className="w-full overflow-hidden">
            <div className="absolute h-[100vh] z-[-1] bottom-0 w-full" />
            <div>
                <div className="bg-[#A100FF] w-full h-screen text-center text-white flex flex-col items-center justify-center">
                    <div className="h-fit overflow-hidden">
                        <p className="font-designTenada text-[28px] sm:text-[32px] md:text-[40px]">
                            기획에서 배포까지
                        </p>
                        <h2 className="font-design text-[72px] sm:text-[128px] mb-[60px]">
                            TECH STACK
                        </h2>
                        <p className="text-[16px] sm:text-[24px]">
                            디자인과 기술이 조화롭게 어우러지는 웹을 목표로
                        </p>
                    </div>
                </div>
                <div className="mt-[55px] flex flex-col gap-[60px] ">
                    <h3 className="font-primaryBold text-[36px] sm:text-[64px] text-right px-4 text-[#A100FF]">
                        기술 스택
                    </h3>
                    <ul>
                        {dataList.map((item) => (
                            <li
                                key={item.id}
                                className="border-t border-t-[#A100FF] text-[#A100FF] px-10 py-4 flex flex-col gap-5 sm:gap-0 sm:flex-row justify-between "
                            >
                                <div className="w-full sm:w-[15%] text-[24px] font-primaryBold flex flex-col gap-4">
                                    <p>{item.number}</p>
                                    <div className="flex w-full sm:flex-col flex-wrap gap-1">
                                        {item.tacstack?.map((item) => (
                                            <span
                                                key={item}
                                                className="font-primaryRegular text-[16px]"
                                            >
                                                {item}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <div className="flex-1 flex flex-col gap-3 sm:gap-[50px] md:gap-[60px]">
                                    <h4 className="text-[24px] sm:text-[clamp(24px,3vw,32px)] md:text-[48px]">
                                        {item.title}
                                    </h4>
                                    <ul className="text-[14px] md:text-[20px] mb-8">
                                        {item.content.map((content, i) => (
                                            <li key={i}>{content}</li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="text-[16px] sm:text-[clamp(14px,1.5vw,16px)] md:text-[clamp(16px,1vw,20px)] font-primaryBold mb-10">
                                    <p>{item.subtitle}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default index;
