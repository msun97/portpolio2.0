import { RefObject, useEffect, useState } from 'react';
import gsap from 'gsap';

const ROWS = 10;
const FILL_COLOR = '#76ABAE';
const MIN_THRESHOLD = 0.03;
const MAX_THRESHOLD = 0.97;
const MAX_BLUR = 6;
const COVER_DURATION = 1.1;
const HOLD_DURATION = 0.45;
const UNCOVER_DURATION = 1.1;
const WHEEL_THRESHOLD = 4;
const TOUCH_THRESHOLD = 30;

interface Cell {
    threshold: number;
}

interface Grid {
    size: number;
    cols: number;
    cells: Cell[][];
}

const buildGrid = (width: number, height: number): Grid => {
    const size = height / ROWS;
    const cols = Math.ceil(width / size);
    const cells: Cell[][] = [];

    for (let r = 0; r < ROWS; r++) {
        const row: Cell[] = [];
        for (let c = 0; c < cols; c++) {
            const base = 1 - c / Math.max(cols - 1, 1);
            const jitter = (Math.random() - 0.5) * 0.4;
            row.push({ threshold: Math.min(MAX_THRESHOLD, Math.max(MIN_THRESHOLD, base + jitter)) });
        }
        cells.push(row);
    }

    return { size, cols, cells };
};

interface MosaicTransitionProps {
    heroRef: RefObject<HTMLElement | null>;
    worksRef: RefObject<HTMLElement | null>;
}

type Mode = 'hero' | 'works';

const MosaicTransition = ({ heroRef, worksRef }: MosaicTransitionProps) => {
    const [grid, setGrid] = useState<Grid | null>(null);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const handleResize = () => setGrid(buildGrid(window.innerWidth, window.innerHeight));
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const hero = heroRef.current;
        const works = worksRef.current;
        if (!hero || !works) return;

        const getWorksTop = () => works.getBoundingClientRect().top + window.scrollY;

        let mode: Mode = window.scrollY >= getWorksTop() / 2 ? 'works' : 'hero';
        let busy = false;
        let timeline: gsap.core.Timeline | null = null;
        const state = { p: 0 };

        hero.style.visibility = mode === 'hero' ? 'visible' : 'hidden';

        // 사각형이 덮이고 -> 꽉 찬 상태에서 화면 교체 -> 사각형이 빠지는 시퀀스 (스크롤은 잠금)
        const play = (next: Mode) => {
            if (busy) return;
            busy = true;
            document.documentElement.style.overflow = 'hidden';

            timeline = gsap
                .timeline({
                    onComplete: () => {
                        busy = false;
                        mode = next;
                        setProgress(0);
                        document.documentElement.style.overflow = '';
                    },
                })
                .to(state, { p: 1, duration: COVER_DURATION, ease: 'power2.inOut', onUpdate: () => setProgress(state.p) })
                .call(
                    () => {
                        hero.style.visibility = next === 'hero' ? 'visible' : 'hidden';
                        window.scrollTo(0, next === 'hero' ? 0 : getWorksTop());
                    },
                    [],
                    `+=${HOLD_DURATION}`
                )
                .to(state, { p: 0, duration: UNCOVER_DURATION, ease: 'power2.inOut', onUpdate: () => setProgress(state.p) }, `+=${HOLD_DURATION}`);
        };

        const atWorksTop = () => window.scrollY <= getWorksTop() + 2;

        // dir: 1(아래로) / -1(위로). 트랜지션을 시작했거나 막아야 하면 true
        const handleIntent = (dir: number) => {
            if (busy) return true;
            if (mode === 'hero' && dir > 0) {
                play('works');
                return true;
            }
            if (mode === 'works' && dir < 0 && atWorksTop()) {
                play('hero');
                return true;
            }
            return mode === 'hero';
        };

        const onWheel = (e: WheelEvent) => {
            if (document.querySelector('[data-modal]')) return;
            if (Math.abs(e.deltaY) < WHEEL_THRESHOLD) return;
            if (handleIntent(Math.sign(e.deltaY))) e.preventDefault();
        };

        let touchY = 0;
        const onTouchStart = (e: TouchEvent) => {
            touchY = e.touches[0].clientY;
        };
        const onTouchMove = (e: TouchEvent) => {
            const delta = touchY - e.touches[0].clientY;
            if (busy || mode === 'hero') e.preventDefault();
            if (Math.abs(delta) < TOUCH_THRESHOLD) return;
            handleIntent(Math.sign(delta));
            touchY = e.touches[0].clientY;
        };

        const onKeyDown = (e: KeyboardEvent) => {
            if (document.querySelector('[data-modal]')) return;
            const down = ['ArrowDown', 'PageDown', ' ', 'End'].includes(e.key);
            const up = ['ArrowUp', 'PageUp', 'Home'].includes(e.key);
            if (!down && !up) return;
            if (handleIntent(down ? 1 : -1)) e.preventDefault();
        };

        // 리스트 모드에서 큰 스크롤로 메인 영역까지 넘어가는 것을 방지
        const onScroll = () => {
            if (!busy && mode === 'works' && window.scrollY < getWorksTop() - 2) {
                window.scrollTo(0, getWorksTop());
            }
        };

        window.addEventListener('scroll', onScroll);
        window.addEventListener('wheel', onWheel, { passive: false });
        window.addEventListener('touchstart', onTouchStart, { passive: true });
        window.addEventListener('touchmove', onTouchMove, { passive: false });
        window.addEventListener('keydown', onKeyDown);

        return () => {
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('wheel', onWheel);
            window.removeEventListener('touchstart', onTouchStart);
            window.removeEventListener('touchmove', onTouchMove);
            window.removeEventListener('keydown', onKeyDown);
            timeline?.kill();
            document.documentElement.style.overflow = '';
            hero.style.visibility = '';
        };
    }, [heroRef, worksRef]);

    if (!grid || progress <= 0) return null;

    const blur = progress * MAX_BLUR;

    return (
        <div className="pointer-events-none fixed inset-0 z-[100] overflow-hidden">
            <div
                className="absolute inset-0"
                style={{
                    backdropFilter: `blur(${blur}px)`,
                    WebkitBackdropFilter: `blur(${blur}px)`,
                }}
            />
            <div
                className="absolute top-0 right-0"
                style={{
                    display: 'grid',
                    gridTemplateColumns: `repeat(${grid.cols}, ${grid.size}px)`,
                    gridTemplateRows: `repeat(${ROWS}, ${grid.size}px)`,
                }}
            >
                {grid.cells.flatMap((row, r) =>
                    row.map((cell, c) => {
                        const filled = progress >= cell.threshold;
                        return (
                            <div
                                key={`${r}-${c}`}
                                style={{
                                    backgroundColor: FILL_COLOR,
                                    opacity: filled ? 1 : 0,
                                    transform: filled ? 'scale(1)' : 'scale(0.4)',
                                    transition: 'opacity 0.35s ease, transform 0.35s ease',
                                }}
                            />
                        );
                    })
                )}
            </div>
        </div>
    );
};

export default MosaicTransition;
