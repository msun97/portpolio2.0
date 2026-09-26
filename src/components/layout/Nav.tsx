import Link from 'next/link';

const NAV_LINK_CLASS =
    "relative font-chosunGulim text-[20px] text-[#eeeeee] after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[1px] after:bg-[#76ABAE] after:transition-all after:duration-300 hover:after:w-full";

const Nav = () => {
    return (
        <nav
            className="fixed top-0 left-0 z-40 flex items-start h-[100px] w-full pt-[20px] px-[100px] backdrop-blur-md"
            style={{ backgroundColor: 'rgba(34, 40, 49, 0.6)' }}
        >
            <div className="flex items-center gap-[100px]">
                <Link href="/" className={NAV_LINK_CLASS}>
                    김미선
                </Link>
                <Link href="/works" className={NAV_LINK_CLASS}>
                    WorkList.tsx
                </Link>
                <Link href="/techstack" className={NAV_LINK_CLASS}>
                    techStack.java
                </Link>
            </div>

            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <img src="/2026/qr_github.svg" width={60} height={60} alt="github" />
            </div>

            <Link href="/contact" className={`${NAV_LINK_CLASS} ml-auto`}>
                contact.sql
            </Link>
        </nav>
    );
};

export default Nav;
