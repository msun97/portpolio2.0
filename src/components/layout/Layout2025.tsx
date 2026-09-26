import { ReactNode } from 'react';
import LegacyHeader from '@/components/2025/layout/Header';
import Footer from './Footer';

interface Layout2025Props {
    children: ReactNode;
}

const Layout2025 = ({ children }: Layout2025Props) => {
    return (
        <div className="min-h-screen relative isolate">
            <LegacyHeader />
            <main>{children}</main>
            <Footer />
        </div>
    );
};

export default Layout2025;
