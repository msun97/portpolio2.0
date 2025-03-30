import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

const MobileHeaderModal = ({ onClose }: { onClose: () => void }) => {
    const router = useRouter();

    useEffect(() => {
        const handleRouteChange = () => {
            onClose();
        };

        router.events.on('routeChangeStart', handleRouteChange);
        return () => {
            router.events.off('routeChangeStart', handleRouteChange);
        };
    }, [router, onClose]);

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);
    return (
        <div className="absolute bg-white w-screen h-screen z-30 mt-[30px] m-[-16px] p-4 text-[32px]">
            <ul>
                <li className="py-1">
                    <Link
                        href="/"
                        className="relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[1px] after:bg-black after:transition-all after:duration-300 hover:after:w-full"
                    >
                        ABOUT ME
                    </Link>
                </li>
                <li className="py-1 border-t border-t-gray-200">
                    <Link
                        href="/works"
                        className="relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[1px] after:bg-black after:transition-all after:duration-300 hover:after:w-full"
                    >
                        WORKS
                    </Link>
                </li>
                <li className="py-1 border-t border-t-gray-200">
                    <Link
                        href="/techstack"
                        className="relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[1px] after:bg-black after:transition-all after:duration-300 hover:after:w-full"
                    >
                        TECH STACK
                    </Link>
                </li>
                <li className="py-1 border-t border-t-gray-200">
                    <Link href="/contact">CONTACT</Link>
                </li>
            </ul>
        </div>
    );
};

export default MobileHeaderModal;
