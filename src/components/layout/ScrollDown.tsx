const ARROW_OPACITY = [0.5, 0.3, 0.1];

const ScrollDown = () => {
    return (
        <div className="fixed right-[60px] bottom-[40px] z-40 flex flex-col items-center">
            <span className="[writing-mode:vertical-rl] [text-orientation:mixed] whitespace-nowrap font-chosunGulim text-[16px] leading-[20px] tracking-[0] text-[#eeeeee]">
                SCROLL DOWN
            </span>
            <div className="mt-[9px] flex flex-col items-center gap-[4px]">
                {ARROW_OPACITY.map((opacity, index) => (
                    <span
                        key={index}
                        className="animate-arrowBounce font-bitcount text-[16px] leading-none text-[#eeeeee]"
                        style={{ opacity, animationDelay: `${index * 0.15}s` }}
                    >
                        v
                    </span>
                ))}
            </div>
        </div>
    );
};

export default ScrollDown;
