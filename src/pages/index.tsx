import { useEffect, useState } from 'react';
import Loading from '@/components/home/Loading';
import Section1 from '@/components/home/Section1';
import Section2 from '@/components/home/Section2';
import Section3 from '@/components/home/Section3';
import Section4 from '@/components/home/Section4';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import gsap from 'gsap';
gsap.registerPlugin(ScrollTrigger);
const Home = () => {
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(true);
            ScrollTrigger.refresh();
        }, 4000);

        return () => clearTimeout(timer);
    }, []);

    const skipToggle = () => {
        setIsLoading(true);
    };
    return (
        <>
            {isLoading ? (
                <div className=" overflow-x-hidden mb-32">
                    <Section1 />
                    <Section2 />
                    <Section3 />
                    <Section4 />
                </div>
            ) : (
                <div className="absolute bg-white w-screen h-screen font-coding flex text-left items-center justify-center top-0 left-0 z-100">
                    <Loading onClick={skipToggle} />
                </div>
            )}
        </>
    );
};

export default Home;
