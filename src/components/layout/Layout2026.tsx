import { ReactNode, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Nav from './Nav';
import HoverGrid from './HoverGrid';
import Info from './Info';
import Bio from './Bio';
import Signature from './Signature';
import Badge from './Badge';
import Year from './Year';
import MonitorLabel from './MonitorLabel';
import ScrollDown from './ScrollDown';

interface Layout2026Props {
    children: ReactNode;
}

const HERO_SCROLL_DISTANCE_RATIO = 0.5;

const Layout2026 = ({ children }: Layout2026Props) => {
    const pathname = usePathname();
    const isHome = pathname === '/';
    const [inHeroZone, setInHeroZone] = useState(true);

    useEffect(() => {
        if (!isHome) return;

        const handleScroll = () => {
            const threshold = window.innerHeight * HERO_SCROLL_DISTANCE_RATIO;
            setInHeroZone(window.scrollY <= threshold);
        };
        handleScroll();
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isHome]);

    const showHeroChrome = isHome && inHeroZone;

    return (
        <div className="min-h-screen relative isolate" style={{ backgroundColor: '#222831' }}>
            <HoverGrid />
            <Nav />
            {showHeroChrome && (
                <>
                    <Info />
                    <Bio />
                    <Signature />
                    <Badge />
                    <Year />
                    <MonitorLabel />
                    <ScrollDown />
                </>
            )}
            <main className="min-h-screen pt-[100px]">{children}</main>
        </div>
    );
};

export default Layout2026;
