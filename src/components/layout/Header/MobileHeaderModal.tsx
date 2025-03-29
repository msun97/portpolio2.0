import React from 'react';

const MobileHeaderModal = () => {
    return (
        <div className="absolute bg-white w-screen h-screen z-30 mt-[30px] m-[-16px] p-4 text-[32px]">
            <ul>
                <li className="py-1">
                    <a
                        href="/"
                        className="relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[1px] after:bg-black after:transition-all after:duration-300 hover:after:w-full"
                    >
                        ABOUT ME
                    </a>
                </li>
                <li className="py-1 border-t border-t-gray-200">
                    <a
                        href="/works"
                        className="relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[1px] after:bg-black after:transition-all after:duration-300 hover:after:w-full"
                    >
                        WORKS
                    </a>
                </li>
                <li className="py-1 border-t border-t-gray-200">
                    <a
                        href="/techstack"
                        className="relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[1px] after:bg-black after:transition-all after:duration-300 hover:after:w-full"
                    >
                        TECH STACK
                    </a>
                </li>
                <li className="py-1 border-t border-t-gray-200">
                    <a href="/contact">CONTACT</a>
                </li>
            </ul>
        </div>
    );
};

export default MobileHeaderModal;
