import { ReactNode } from 'react';
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

const Layout2026 = ({ children }: Layout2026Props) => {
    return (
        <div className="min-h-screen relative isolate" style={{ backgroundColor: '#222831' }}>
            <HoverGrid />
            <Nav />
            <Info />
            <Bio />
            <Signature />
            <Badge />
            <Year />
            <MonitorLabel />
            <ScrollDown />
            <main className="h-screen pt-[100px]">{children}</main>
        </div>
    );
};

export default Layout2026;
