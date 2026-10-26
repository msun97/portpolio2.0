import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ConfidentialCover from './ConfidentialCover';
import type { Project } from './types';

interface WorkModalProps {
    project: Project;
    onClose: () => void;
}

const WorkModal = ({ project, onClose }: WorkModalProps) => {
    const { num, projectSubject, title, content, techStack, siteLink, gitLink, pdfLink, imgLink, confidential } = project;

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        const original = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            document.body.style.overflow = original;
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [onClose]);

    return (
        <div
            data-modal
            className="fixed inset-0 z-[90] flex items-center justify-center bg-[#222831]/80 p-[24px] backdrop-blur-sm"
            onClick={onClose}
        >
            <div
                role="dialog"
                aria-modal="true"
                aria-label={title}
                className="relative flex h-[640px] max-h-full w-[1100px] max-w-full overflow-hidden bg-[#0d1117] text-[#eeeeee]"
                onClick={(e) => e.stopPropagation()}
            >
                {/* 배경: 프로젝트 사진을 크게, 어두운 바탕 위에 불투명도로 흐리게 (opacity-25 값으로 조절) */}
                <div className="absolute inset-0 opacity-25">
                    {confidential && <ConfidentialCover />}
                    {imgLink && (
                        <Image
                            src={imgLink}
                            alt=""
                            fill
                            sizes="1100px"
                            quality={95}
                            className="object-cover object-left-top"
                        />
                    )}
                </div>

                <button
                    type="button"
                    onClick={onClose}
                    aria-label="닫기"
                    className="absolute top-[16px] right-[20px] z-10 cursor-pointer font-chosunGulim text-[1.5rem] leading-none"
                >
                    ✕
                </button>

                {/* 글자 영역: 어두운 반투명 패널 (농도는 bg-[#0d1117]/60 값으로 조절) */}
                <div className="relative z-[1] m-[32px] flex min-w-0 flex-1 flex-col gap-[20px] overflow-y-auto bg-[#0d1117]/60 p-[40px] text-[#eeeeee]">
                    <div className="flex items-baseline gap-[12px] font-chosunGulim text-[1rem]">
                        <span className="opacity-60">{num}</span>
                        <span>{projectSubject}</span>
                    </div>
                    <h3 className="font-chosunGulim text-[2rem] leading-[2.5rem]">{title}</h3>
                    <p className="font-chosunGulim text-[1rem] leading-[1.75rem] text-[#eeeeee]/80">{content}</p>
                    <div className="flex flex-wrap gap-[8px]">
                        {techStack.map((tech) => (
                            <span
                                key={tech}
                                className="rounded-[4px] bg-[#eeeeee]/15 px-[10px] py-[4px] font-chosunGulim text-[0.75rem] text-[#eeeeee]"
                            >
                                {tech}
                            </span>
                        ))}
                    </div>
                    {(siteLink || gitLink || pdfLink) && (
                        <div className="mt-auto flex gap-[20px] font-chosunGulim text-[1rem]">
                            {siteLink && (
                                <Link href={siteLink} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">
                                    Site
                                </Link>
                            )}
                            {pdfLink && (
                                <a href={pdfLink} download="경력기술서.pdf" className="underline underline-offset-4">
                                    경력기술서 다운로드
                                </a>
                            )}
                            {gitLink && (
                                <Link href={gitLink} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">
                                    Github
                                </Link>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default WorkModal;
