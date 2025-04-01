import gsap from 'gsap';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';

type MobileHeaderModalProps = {
    onClose: () => void;
    slideDirection?: string; // ✅ 선택적 props로 추가
};

const MobileHeaderModal: React.FC<MobileHeaderModalProps> = ({
    onClose,
    slideDirection = 'up',
}) => {
    const router = useRouter();
    const modalRef = useRef(null);
    const contentRef = useRef(null);

    useEffect(() => {
        // 모달이 처음 마운트될 때 초기 위치 설정
        if (modalRef.current) {
            // 모달 배경 애니메이션
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
            // 모달 콘텐츠 애니메이션 - 아래에서 위로 슬라이드
            gsap.fromTo(
                contentRef.current,
                {
                    y: '-100%', // 화면 아래에서 시작
                },
                {
                    y: '0%', // 원래 위치로 이동
                    duration: 0.7,
                    ease: 'power3.out',
                    delay: 0.1, // 배경보다 약간 늦게 시작
                }
            );
        }

        // 클린업 함수
        return () => {
            // 컴포넌트가 언마운트될 때 애니메이션 정리
            gsap.killTweensOf(modalRef.current);
            gsap.killTweensOf(contentRef.current);
        };
    }, [slideDirection]);

    // 모달 닫기 애니메이션
    const handleClose = () => {
        // 모달 콘텐츠 먼저 아래로 슬라이드
        gsap.to(contentRef.current, {
            y: '100%',
            opacity: 0.7,
            duration: 0.4,
            ease: 'power3.in',
        });

        // 그 다음 배경 페이드 아웃
        gsap.to(modalRef.current, {
            opacity: 0,
            duration: 0.3,
            delay: 0.2,
            ease: 'power2.in',
            onComplete: onClose, // 애니메이션 완료 후 모달 상태 변경
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
