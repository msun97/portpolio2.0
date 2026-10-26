import { useState } from 'react';
import WorkItem from './WorkItem';
import WorkModal from './WorkModal';
import type { Project } from './types';

const PROJECTS: Project[] = [
    {
        num: '05',
        projectSubject: '개인 프로젝트 02',
        title: '흡연구역 지도 사이트',
        content: '흡연구역 위치를 지도에서 쉽게 찾아볼 수 있도록 만든 웹 사이트입니다.',
        imgLink: '/smoke-map.jpg',
        techStack: ['React', 'JAVA', 'Spring Boot', 'PostgreSQL', 'AWS'],
        siteLink: 'https://smoke-dev-front.vercel.app/',
        gitLink: 'https://github.com/msun97/smoke-dev-front',
    },
    {
        num: '01',
        projectSubject: '실무 프로젝트 01',
        title: '항우연 디지털트윈 웹사이트',
        confidential: true,
        pdfLink: '/career-description.pdf',
        content: '다양하고 복잡한 정보를 시각적으로 접근할 수 있는 방안을 고민하며 개발하였습니다.',
        techStack: ['Figma', 'React', 'JAVA', 'Spring Boot', 'PostgreSQL'],
    },
    {
        num: '02',
        projectSubject: '팀 프로젝트 02',
        title: 'Van Cleef 사이트 리뉴얼',
        content: '하이 쥬얼리 컨셉을 살린 고급스러운 느낌과 명확한 UI를 목표로 진행하였습니다.',
        imgLink: '/works1.jpg',
        techStack: ['PhotoShop', 'Figma', 'React', 'Redux', 'GSAP'],
        siteLink: 'https://project-vancleef.vercel.app/',
        gitLink: 'https://github.com/msun97/project-vancleef',
    },
    {
        num: '03',
        projectSubject: '팀 프로젝트 01',
        title: 'OTT 사이트 Viewee 제작',
        content: 'Redux를 통해 상태관리 및 사용자 데이터 관리를 중점으로 진행하였습니다.',
        imgLink: '/works2.jpg',
        techStack: ['PhotoShop', 'Figma', 'React', 'Redux', 'GSAP'],
        siteLink: 'https://viewee.vercel.app/',
        gitLink: 'https://github.com/zio-s/project-viewee',
    },
    {
        num: '04',
        projectSubject: '개인 프로젝트 01',
        title: 'CLIO 코스메틱 홈페이지 리뉴얼',
        content: 'React를 통해 컴포넌트를 분리하여 재사용이 쉬운 사이트를 만들고자 했습니다.',
        imgLink: '/works3.jpg',
        techStack: ['Figma', 'React', 'GSAP'],
        siteLink: 'https://project1-react-master.vercel.app/',
        gitLink: 'https://github.com/msun97/project1--react-master',
    },
];

const CARDS_PER_ROW = 4;

const ROWS = Array.from({ length: Math.ceil(PROJECTS.length / CARDS_PER_ROW) }, (_, i) =>
    PROJECTS.slice(i * CARDS_PER_ROW, (i + 1) * CARDS_PER_ROW)
);

interface WorksSectionProps {
    id?: string;
}

const WorksSection = ({ id }: WorksSectionProps) => {
    const [selected, setSelected] = useState<Project | null>(null);

    return (
        <div id={id} className="bg-[#76ABAE]/50 px-[60px] pt-[180px] pb-[200px]">
            <div className="mx-auto flex w-[1800px] flex-col gap-[100px]">
                {ROWS.map((row, i) => (
                    <div key={i} className="flex gap-[120px]">
                        {row.map((project) => (
                            <WorkItem key={project.num} {...project} onClick={() => setSelected(project)} />
                        ))}
                    </div>
                ))}
            </div>
            {selected && <WorkModal project={selected} onClose={() => setSelected(null)} />}
        </div>
    );
};

export default WorksSection;
