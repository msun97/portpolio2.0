import Image from 'next/image';
import { Ubuntu_Mono } from 'next/font/google';
import ConfidentialCover from './ConfidentialCover';
import type { Project } from './types';

const ubuntuMono = Ubuntu_Mono({ subsets: ['latin'], weight: ['400', '700'] });
const MONO_FONT = `${ubuntuMono.style.fontFamily}, 'JoseonGulim', 'Pretendard-Regular', monospace`;

interface WorkItemProps extends Project {
    onClick: () => void;
}

const WorkItem = ({ title, techStack, imgLink, confidential, onClick }: WorkItemProps) => {
    return (
        <button
            type="button"
            onClick={onClick}
            className="flex w-[360px] shrink-0 cursor-pointer flex-col border-t border-[#818181] pt-[7px] text-left"
        >
            <h3 className="text-[16px] leading-[20px] font-medium text-[#222831]" style={{ fontFamily: MONO_FONT }}>
                {title}
            </h3>
            <p className="text-[12px] leading-[16px] font-normal text-[#eeeeee]" style={{ fontFamily: MONO_FONT }}>
                {techStack.join(', ')}
            </p>
            <div className="relative mt-[15px] h-[464px] w-full overflow-hidden bg-[#222831]/10">
                {confidential && <ConfidentialCover />}
                {imgLink && <Image src={imgLink} alt={title} fill sizes="720px" quality={95} className="object-cover object-left-top" />}
            </div>
        </button>
    );
};

export default WorkItem;
