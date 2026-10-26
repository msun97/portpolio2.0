import Image from 'next/image';

// 공개할 수 없는 프로젝트용 커버: 블랙 배경 + 흐리게 처리한 기관 로고 + 그 위에 대외비 마크
const ConfidentialCover = () => {
    return (
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden bg-[#0d1117]">
            <Image
                src="/kari-logo.png"
                alt="한국항공우주연구원"
                width={260}
                height={260}
                unoptimized
                className="opacity-45 blur-[3px]"
            />
            <span className="absolute -rotate-[10deg] border border-[#eeeeee]/60 px-[24px] py-[10px] pl-[calc(24px+0.4em)] font-chosunGulim text-[1.6rem] tracking-[0.4em] text-[#eeeeee]/70">
                대외비
            </span>
        </div>
    );
};

export default ConfidentialCover;
