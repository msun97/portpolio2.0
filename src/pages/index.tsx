import { useRef, useState } from 'react';
import Loading from '@/components/home/Loading';
import Section1 from '@/components/home/Section1';
import MosaicTransition from '@/components/home/MosaicTransition';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import gsap from 'gsap';
gsap.registerPlugin(ScrollTrigger);

const Home = () => {
    const [isLoading, setIsLoading] = useState(false);
    const heroRef = useRef<HTMLDivElement>(null);

    const finishLoading = () => {
        setIsLoading(true);
        ScrollTrigger.refresh();
    };
    return (
        <>
            {isLoading ? (
                <>
                    <div ref={heroRef} className="-mt-[100px] mb-32">
                        <Section1 />
                    </div>
                    <MosaicTransition heroRef={heroRef} nextHref="/works" />
                    <div className="h-screen" style={{ backgroundColor: '#222831' }} />
                </>
            ) : (
                <Loading onClick={finishLoading} onComplete={finishLoading} />
            )}
        </>
    );
};

export default Home;
