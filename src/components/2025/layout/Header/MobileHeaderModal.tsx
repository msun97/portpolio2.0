import gsap from 'gsap';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';

type MobileHeaderModalProps = {
    onClose: () => void;
    slideDirection?: string;
};

const MobileHeaderModal: React.FC<MobileHeaderModalProps> = ({
    onClose,
    slideDirection = 'up',
}) => {
    const router = useRouter();
    const modalRef = useRef(null);
    const contentRef = useRef(null);

    useEffect(() => {
        if (modalRef.current) {
            gsap.fromTo(
                modalRef.current,
                {
                    y: '-100%',
                },
                {
                    y: '0%',
                    duration: 0.5,
                    ease: 'power2.out',
                }
            );
        }

        if (contentRef.current) {
            gsap.fromTo(
                contentRef.current,
                {
                    y: '-100%',
                },
                {
                    y: '0%',
                    duration: 0.7,
                    ease: 'power3.out',
                    delay: 0.1,
                }
            );
        }

        return () => {
            gsap.killTweensOf(modalRef.current);
            gsap.killTweensOf(contentRef.current);
        };
    }, [slideDirection]);

    const handleClose = () => {
        gsap.to(contentRef.current, {
            y: '100%',
            opacity: 0.7,
            duration: 0.4,
            ease: 'power3.in',
        });

        gsap.to(modalRef.current, {
            opacity: 0,
            duration: 0.3,
            delay: 0.2,
            ease: 'power2.in',
            onComplete: onClose,
        });
    };

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

    const [isContact, setIsContact] = useState(false);
    const location = usePathname();
    useEffect(() => {
        if (location === '/contact' || location === '/works') {
            setIsContact(true);
        } else {
            setIsContact(false);
        }
    }, [location]);
    return (
        <div
            className={`absolute text-${
                isContact ? 'white' : 'black'
            } w-screen h-screen z-30 mt-[30px] m-[-16px] p-4 text-[32px]`}
            style={{
                backgroundColor: isContact ? 'black' : 'white',
            }}
            ref={modalRef}
            onClick={handleClose}
        >
            <ul ref={contentRef} onClick={(e) => e.stopPropagation()}>
                <li className="py-1">
                    <Link
                        href="/"
                        className="relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[1px] after:bg-black after:transition-all after:duration-300 hover:after:w-full"
                        onClick={handleClose}
                    >
                        ABOUT ME
                    </Link>
                </li>
                <li className="py-1 border-t border-t-gray-200">
                    <Link
                        href="/works"
                        className="relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[1px] after:bg-black after:transition-all after:duration-300 hover:after:w-full"
                        onClick={handleClose}
                    >
                        WORKS
                    </Link>
                </li>
                <li className="py-1 border-t border-t-gray-200">
                    <Link
                        href="/techstack"
                        className="relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[1px] after:bg-black after:transition-all after:duration-300 hover:after:w-full"
                        onClick={handleClose}
                    >
                        TECH STACK
                    </Link>
                </li>
                <li className="py-1 border-t border-t-gray-200">
                    <Link href="/contact" onClick={handleClose}>
                        CONTACT
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default MobileHeaderModal;
