import { useEffect, useState } from 'react';
import MobileHeaderModal from './Header/MobileHeaderModal';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';
import Link from 'next/link';

const Header = () => {
    const [isTablet, setIsTablet] = useState(false);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setIsTablet(window.innerWidth <= 1024);

            const handleResize = () => {
                setIsTablet(window.innerWidth <= 1024);
            };

            window.addEventListener('resize', handleResize);
            return () => window.removeEventListener('resize', handleResize);
        }
    }, []);

    const [isModal, setIsModal] = useState(false);
    const toggleModal = () => setIsModal(!isModal);

    const [isContact, setIsContact] = useState(false);
    const location = usePathname();

    useEffect(() => {
        gsap.fromTo(
            'header',
            { y: '100%', opacity: 0 },
            {
                y: '0%',
                opacity: 1,
                ease: 'power3.out',
                delay: location === '/' ? 3.5 : 0,
            }
        );
    }, []);
    useEffect(() => {
        if (location === '/contact' || location === '/works') {
            setIsContact(true);
        } else {
            setIsContact(false);
        }
    }, [location]);

    const [isSticky, setIsSticky] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                setIsSticky(false);
            } else {
                setIsSticky(true);
            }

            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    return (
        <header
            className={`p-4 flex justify-between font-primaryBold text-[19px] z-[50] w-full fixed transition-all duration-500 ${
                isSticky ? 'top-0' : '-top-20'
            }`}
            style={{
                color: isContact ? 'white' : 'black',
            }}
        >
            <Link href="/">
                <h1 className="text-[24px]">KIMMISEON</h1>
            </Link>
            {!isTablet ? (
                <>
                    <div>
                        <p>FRONTEND DEVELOPER</p>
                        <p className="font-primaryRegular">합리적이고 창의적인</p>
                    </div>
                    <nav className="flex justify-between font-primaryRegular">
                        <ul className="flex gap-4">
                            <li>
                                <Link
                                    href="/"
                                    className={`relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[1px] after:bg-${
                                        isContact ? 'white' : 'black'
                                    } after:transition-all after:duration-300 hover:after:w-full`}
                                >
                                    About Me,
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/works"
                                    className="relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[1px] after:bg-black after:transition-all after:duration-300 hover:after:w-full"
                                >
                                    Works,
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/techstack"
                                    className="relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[1px] after:bg-black after:transition-all after:duration-300 hover:after:w-full"
                                >
                                    Tech Stack,
                                </Link>
                            </li>
                        </ul>
                    </nav>
                    <div>
                        <Link href="/contact">
                            <p className="font-primaryRegular relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[1px] after:bg-black after:transition-all after:duration-300 hover:after:w-0 ">
                                Let's Contact
                            </p>
                        </Link>
                    </div>
                </>
            ) : (
                <>
                    <div
                        onClick={toggleModal}
                        className="cursor-pointer font-primaryRegular text-[17px] flex items-center gap-3"
                    >
                        <p>Menu</p>
                        <img
                            src="/x.svg"
                            className={`transition-transform duration-300 ${
                                isModal ? '' : 'rotate-45'
                            }`}
                        />
                    </div>
                    {isModal && <MobileHeaderModal onClose={toggleModal} />}
                </>
            )}
        </header>
    );
};

export default Header;
