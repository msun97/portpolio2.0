import { RefObject, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ROWS = 10;
const FILL_COLOR = '#76ABAE';
const NAVIGATE_THRESHOLD = 0.999;
const MIN_THRESHOLD = 0.03;
const MAX_THRESHOLD = 0.97;
const MAX_BLUR = 16;
const SPACER_COLOR = '#222831';

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
    nextHref: string;
}

const MosaicTransition = ({ heroRef, nextHref }: MosaicTransitionProps) => {
    const router = useRouter();
    const navigatedRef = useRef(false);
    const [grid, setGrid] = useState<Grid | null>(null);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const handleResize = () => setGrid(buildGrid(window.innerWidth, window.innerHeight));
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if (!heroRef.current) return;

        const trigger = ScrollTrigger.create({
            trigger: heroRef.current,
            start: 'top top',
            end: `+=${window.innerHeight * 2.5}`,
            pin: true,
            scrub: true,
            onUpdate: (self) => setProgress(self.progress),
        });

        const pinSpacer = (trigger as unknown as { pinSpacer?: HTMLElement }).pinSpacer;
        if (pinSpacer) {
            pinSpacer.style.backgroundColor = SPACER_COLOR;
        }

        return () => trigger.kill();
    }, [heroRef]);

    useEffect(() => {
        if (progress >= NAVIGATE_THRESHOLD && !navigatedRef.current) {
            navigatedRef.current = true;
            router.push(nextHref);
        }
    }, [progress, router, nextHref]);

    if (!grid) return null;

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
