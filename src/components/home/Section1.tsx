import React, { useEffect } from 'react';
import Monitor from './section1/Monitor';
import gsap from 'gsap';

const Section1 = () => {
    useEffect(() => {
        gsap.fromTo(
            'section',
            { y: '100%', opacity: 0 },
            {
                y: '0%',
                opacity: 1,
                ease: 'power3.out',
            }
        );
    }, []);

    return (
        <section className="min-h-[78vmin] relative">
            <div className="absolute left-[70%] top-[56%] -translate-x-1/2 -translate-y-1/2 w-[78vmin] h-[78vmin] overflow-hidden">
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[110vmin] h-[110vmin]">
                    <Monitor />
                </div>
            </div>
        </section>
    );
};

export default Section1;
