import { useEffect, useRef } from 'react';

const DESIGN_WIDTH = 1920;
const FOOTER_HEIGHT = 712;
const TITLE_SIDE_PADDING = 50;
const TITLE_TOP = 500;
const SNS_LINKS = ['https://github.com/msun97', 'https://hollypp.tistory.com/'];

const GrowingFooter = () => {
    const spacerRef = useRef<HTMLDivElement>(null);
    const footerRef = useRef<HTMLElement>(null);
    const innerRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        let scale = 1;

        const update = () => {
            const spacer = spacerRef.current;
            const footer = footerRef.current;
            const inner = innerRef.current;
            if (!spacer || !footer || !inner) return;
            const full = FOOTER_HEIGHT * scale;
            const visible = window.innerHeight - spacer.getBoundingClientRect().top;
            const height = Math.min(full, Math.max(0, visible));
            footer.style.height = `${height}px`;
            inner.style.transform = `scale(${scale}, ${(scale * height) / full})`;
        };
        const fitTitle = () => {
            const title = titleRef.current;
            if (!title) return;
            const available = DESIGN_WIDTH - TITLE_SIDE_PADDING * 2;
            title.style.fontSize = '100px';
            for (let i = 0; i < 3; i++) {
                const size = parseFloat(title.style.fontSize);
                title.style.fontSize = `${(size * available) / title.offsetWidth}px`;
            }
            const maxSize = FOOTER_HEIGHT - TITLE_TOP;
            if (parseFloat(title.style.fontSize) > maxSize) title.style.fontSize = `${maxSize}px`;
        };
        const onResize = () => {
            const spacer = spacerRef.current;
            const footer = footerRef.current;
            if (!spacer || !footer) return;
            scale = Math.min(document.documentElement.clientWidth / DESIGN_WIDTH, window.innerHeight / FOOTER_HEIGHT);
            spacer.style.height = `${FOOTER_HEIGHT * scale}px`;
            update();
        };
        fitTitle();
        onResize();
        document.fonts?.load('700 100px GmarketSans').then(fitTitle);
        window.addEventListener('scroll', update, { passive: true });
        window.addEventListener('resize', onResize);
        return () => {
            window.removeEventListener('scroll', update);
            window.removeEventListener('resize', onResize);
        };
    }, []);

    const backToTop = () => {
        const works = document.getElementById('works');
        if (works) window.scrollTo(0, works.getBoundingClientRect().top + window.scrollY);
        window.dispatchEvent(new WheelEvent('wheel', { deltaY: -100, cancelable: true }));
    };

    return (
        <>
            <div ref={spacerRef} style={{ height: FOOTER_HEIGHT }} aria-hidden />
            <footer
                ref={footerRef}
                className="fixed right-0 bottom-0 left-0 z-[50] h-0 overflow-hidden bg-[#222831] font-chosunGulim text-[#76ABAE]"
            >
                <div
                    ref={innerRef}
                    className="absolute bottom-0 left-1/2 flex origin-bottom flex-col justify-between px-[50px] pt-[40px] pb-0 will-change-transform"
                    style={{ width: DESIGN_WIDTH, height: FOOTER_HEIGHT, marginLeft: -DESIGN_WIDTH / 2, transform: 'scaleY(0)' }}
                >
                    <div className="flex flex-col gap-[16px] text-[20px] leading-[24px] font-normal">
                        <button
                            type="button"
                            onClick={backToTop}
                            className="cursor-pointer self-center underline underline-offset-4 opacity-60"
                        >
                            back to top
                        </button>
                        <div className="flex flex-col items-start gap-[80px]">
                            <div className="flex flex-col gap-[20px]">
                                <span className="opacity-60">phone</span>
                                <span className="tracking-[0.2em]">(+82) 10 2948 0052</span>
                            </div>
                            <div className="flex flex-col gap-[20px]">
                                <span className="opacity-60">e-mail</span>
                                <span className="tracking-[0.2em]">miseong827@gmail.com</span>
                            </div>
                            <div className="flex w-full items-start justify-between">
                                <div className="flex flex-col gap-[20px]">
                                    <span className="opacity-60">address</span>
                                    <span>
                                        Gingorang-ro 13-gil,
                                        <br />
                                        Gwangjin-gu,
                                        <br />
                                        Seoul
                                    </span>
                                </div>
                                <div className="flex flex-col gap-[20px]">
                                    <span className="opacity-60">SNS</span>
                                    <div className="flex flex-col">
                                        {SNS_LINKS.map((href) => (
                                            <a key={href} href={href} target="_blank" rel="noopener noreferrer">
                                                {href}
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <img
                        src="/2026/qr_github_teal.svg"
                        alt="GitHub QR"
                        width={200}
                        height={200}
                        className="absolute top-[260px] left-1/2 h-[200px] w-[200px] -translate-x-1/2"
                    />
                    <span
                        ref={titleRef}
                        className="absolute left-[50px] leading-none font-bold whitespace-nowrap"
                        style={{ top: TITLE_TOP, fontFamily: "'GmarketSans', sans-serif" }}
                    >
                        DEVELOPER MS
                    </span>
                </div>
            </footer>
        </>
    );
};

export default GrowingFooter;
