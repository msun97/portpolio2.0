'use client';

import { useEffect, useState } from 'react';

const Loading = ({ onClick }: { onClick: () => void }) => {
    const [isClient, setIsClient] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [showTooltip, setShowTooltip] = useState(false);
    const finalTexts = [
        'for(when) {',
        '\u00A0\u00A0thejourney.is',
        '\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0.self_taught()',
        '\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0.problem_solving()',
        '\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0.endlessly_learning()',
        '\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0.constantly_iterating()',
        '\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0.sometimes_doubting()',
        '}',
        'we are {',
        '\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0.resilient()',
        '}',
    ];

    useEffect(() => {
        setIsClient(true);
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
            setShowTooltip(true);
        };

        const handleMouseLeave = () => setShowTooltip(false);

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    const scramble = (text: string, progress: number) => {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        return text
            .split('')
            .map((char, index) => {
                return index < Math.floor(text.length * progress)
                    ? char
                    : char === ' '
                    ? ' '
                    : chars[Math.floor(Math.random() * chars.length)];
            })
            .join('');
    };

    const [displayTexts, setDisplayTexts] = useState(finalTexts.map(() => scramble('', 0)));

    const [blurPosition, setBlurPosition] = useState(0);

    useEffect(() => {
        finalTexts.forEach((text, index) => {
            let progress = 0;
            const interval = setInterval(() => {
                progress += 0.02;

                setDisplayTexts((prev) => {
                    const newTexts = [...prev];
                    newTexts[index] = scramble(text, progress);
                    return newTexts;
                });

                if (progress >= 1) {
                    clearInterval(interval);
                }
            }, 50);
        });

        let position = 0;
        const blurInterval = setInterval(() => {
            position += 5;
            setBlurPosition(position);
            if (position >= finalTexts.length * 32) {
                clearInterval(blurInterval);
            }
        }, 100);
    }, []);

    if (!isClient) {
        return null;
    }

    return (
        <div
            className="relative font-mono text-lg leading-8 w-full h-screen overflow-hidden flex justify-center items-center sm:w-1/2"
            onClick={onClick}
        >
            <div>
                {displayTexts.map((text, i) => (
                    <p key={i} className="relative z-10">
                        {text}
                    </p>
                ))}
                <div
                    className="absolute left-0 w-full h-full bg-transparent backdrop-blur-xl transition-all duration-500 z-10"
                    style={{
                        top: `${blurPosition}px`,
                        opacity: `${1 - blurPosition * 0.01}`,
                    }}
                />
            </div>
            {showTooltip && (
                <div
                    className="fixed text-white bg-black bg-opacity-80 px-3 py-1 rounded-md text-sm pointer-events-none transition-opacity duration-200 z-[999]"
                    style={{
                        top: `${mousePosition.y + 10}px`,
                        left: `${mousePosition.x + 10}px`,
                    }}
                >
                    Click for Skip!
                </div>
            )}
        </div>
    );
};

export default Loading;
