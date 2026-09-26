import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import Layout2025 from './Layout2025';
import Layout2026 from './Layout2026';

interface LayoutProps {
    children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
    const pathname = usePathname();
    const isLegacy = pathname?.startsWith('/2025');

    return isLegacy ? <Layout2025>{children}</Layout2025> : <Layout2026>{children}</Layout2026>;
};

export default Layout;
