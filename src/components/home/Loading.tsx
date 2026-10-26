'use client';

import { useEffect, useState } from 'react';

const MIN_LOADING_DURATION = 3000;
const MAX_LOADING_DURATION = 4000;
const ACCENT_LENGTH = 32;
const FINAL_HALF_WIDTH = 340;
const FINAL_HALF_HEIGHT = 200;

type Keyframe = [number, number];

const buildKeyframes = (): Keyframe[] => {
    const stallCount = 2 + Math.floor(Math.random() * 2);
    const frames: Keyframe[] = [[0, 0]];
    let u = 0;
    let percent = 0;

    for (let i = 0; i < stallCount; i++) {
        const remaining = stallCount - i;
        const burstLength = 0.04 + Math.random() * 0.12;
        const holdLength = 0.015 + Math.random() * 0.12;

        u = Math.min(0.97, u + burstLength);
        const percentBudget = (97 - percent) / (remaining + 1);
        percent = Math.min(97, percent + percentBudget * (0.4 + Math.random() * 1.1));
        frames.push([u, percent]);

        u = Math.min(0.98, u + holdLength);
        frames.push([u, percent]);
    }

    frames.push([1, 100]);
    return frames;
};

const getPercent = (frames: Keyframe[], u: number) => {
    const clamped = Math.min(1, Math.max(0, u));
    for (let i = 0; i < frames.length - 1; i++) {
        const [u0, p0] = frames[i];
        const [u1, p1] = frames[i + 1];
        if (clamped <= u1) {
            const localT = u1 === u0 ? 1 : (clamped - u0) / (u1 - u0);
            return p0 + (p1 - p0) * localT;
        }
    }
    return 100;
};

const Loading = ({ onClick, onComplete }: { onClick: () => void; onComplete: () => void }) => {
    const [percent, setPercent] = useState(0);

    useEffect(() => {
        const keyframes = buildKeyframes();
        const duration = MIN_LOADING_DURATION + Math.random() * (MAX_LOADING_DURATION - MIN_LOADING_DURATION);
        const start = performance.now();
        let rafId: number;

        const tick = (now: number) => {
            const elapsed = now - start;
            const next = getPercent(keyframes, elapsed / duration);
            setPercent(next);
            if (next < 100) {
                rafId = requestAnimationFrame(tick);
            } else {
                onComplete();
            }
        };

        rafId = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(rafId);
    }, [onComplete]);

    const t = percent / 100;
    const insetXExpr = `(50vw - ${FINAL_HALF_WIDTH}px) * ${t}`;
    const insetYExpr = `(50vh - ${FINAL_HALF_HEIGHT}px) * ${t}`;
    const insetX = `calc(${insetXExpr})`;
    const insetY = `calc(${insetYExpr})`;
    const half = ACCENT_LENGTH / 2;

    return (
        <div
            className="fixed inset-0 z-50 cursor-pointer"
            style={{ backgroundColor: '#76ABAE' }}
            onClick={onClick}
        >
            <div
                className="fixed left-0 right-0"
                style={{ top: insetY, height: '1px', backgroundColor: '#222831' }}
            />
            <div
                className="fixed left-0 right-0"
                style={{ bottom: insetY, height: '1px', backgroundColor: '#222831' }}
            />
            <div
                className="fixed top-0 bottom-0"
                style={{ left: insetX, width: '1px', backgroundColor: '#222831' }}
            />
            <div
                className="fixed top-0 bottom-0"
                style={{ right: insetX, width: '1px', backgroundColor: '#222831' }}
            />

            <div
                className="fixed"
                style={{ top: insetY, left: `calc(${insetXExpr} - ${half}px)`, width: `${ACCENT_LENGTH}px`, height: '3px', backgroundColor: '#222831', transform: 'translateY(-1px)' }}
            />
            <div
                className="fixed"
                style={{ left: insetX, top: `calc(${insetYExpr} - ${half}px)`, width: '3px', height: `${ACCENT_LENGTH}px`, backgroundColor: '#222831', transform: 'translateX(-1px)' }}
            />
            <div
                className="fixed"
                style={{ top: insetY, right: `calc(${insetXExpr} - ${half}px)`, width: `${ACCENT_LENGTH}px`, height: '3px', backgroundColor: '#222831', transform: 'translateY(-1px)' }}
            />
            <div
                className="fixed"
                style={{ right: insetX, top: `calc(${insetYExpr} - ${half}px)`, width: '3px', height: `${ACCENT_LENGTH}px`, backgroundColor: '#222831', transform: 'translateX(1px)' }}
            />
            <div
                className="fixed"
                style={{ bottom: insetY, left: `calc(${insetXExpr} - ${half}px)`, width: `${ACCENT_LENGTH}px`, height: '3px', backgroundColor: '#222831', transform: 'translateY(1px)' }}
            />
            <div
                className="fixed"
                style={{ left: insetX, bottom: `calc(${insetYExpr} - ${half}px)`, width: '3px', height: `${ACCENT_LENGTH}px`, backgroundColor: '#222831', transform: 'translateX(-1px)' }}
            />
            <div
                className="fixed"
                style={{ bottom: insetY, right: `calc(${insetXExpr} - ${half}px)`, width: `${ACCENT_LENGTH}px`, height: '3px', backgroundColor: '#222831', transform: 'translateY(1px)' }}
            />
            <div
                className="fixed"
                style={{ right: insetX, bottom: `calc(${insetYExpr} - ${half}px)`, width: '3px', height: `${ACCENT_LENGTH}px`, backgroundColor: '#222831', transform: 'translateX(1px)' }}
            />

            <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-chosunGulim text-[36px]" style={{ color: '#222831' }}>
                    {Math.round(percent)}%
                </span>
            </div>
        </div>
    );
};

export default Loading;
