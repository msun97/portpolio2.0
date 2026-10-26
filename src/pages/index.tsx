import { useEffect, useRef, useState } from 'react';
import Loading from '@/components/home/Loading';
import Section1 from '@/components/home/Section1';
import MosaicTransition from '@/components/home/MosaicTransition';
import WorksSection from '@/components/works/WorksSection';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import gsap from 'gsap';
gsap.registerPlugin(ScrollTrigger);

const HAS_SEEN_LOADING_KEY = 'hasSeenLoading';

const Home = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [checkedSession, setCheckedSession] = useState(false);
    const heroRef = useRef<HTMLDivElement>(null);
    const worksRef = useRef<HTMLDivElement>(null);

    const finishLoading = () => {
        setIsLoading(true);
        sessionStorage.setItem(HAS_SEEN_LOADING_KEY, '1');
        ScrollTrigger.refresh();
    };

    useEffect(() => {
        if (sessionStorage.getItem(HAS_SEEN_LOADING_KEY)) {
            setIsLoading(true);
        }
        setCheckedSession(true);
    }, []);

    useEffect(() => {
        const original = document.body.style.backgroundColor;
        document.body.style.backgroundColor = '#222831';
        return () => {
            document.body.style.backgroundColor = original;
        };
    }, []);

    if (!checkedSession) return null;

    return (
        <>
            {isLoading ? (
                <>
                    <div>
                        <div ref={heroRef} className="-mt-[100px] h-screen">
                            <Section1 />
                        </div>
                    </div>
                    <div>
                        <div ref={worksRef}>
                            <WorksSection id="works" />
                        </div>
                    </div>
                    <MosaicTransition heroRef={heroRef} worksRef={worksRef} />
                </>
            ) : (
                <Loading onClick={finishLoading} onComplete={finishLoading} />
            )}
        </>
    );
};

export default Home;
