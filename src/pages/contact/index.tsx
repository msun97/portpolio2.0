import Card from '@/components/contact/Card';
import gsap from 'gsap';
import { useEffect, useRef, useState } from 'react';

const Contact = () => {
    const [modalName, setModalName] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const modalRef = useRef(null);
    const handleOpenModal = (eventOrName?: string | React.MouseEvent<HTMLImageElement>) => {
        if (typeof eventOrName === 'string') {
            setModalName(eventOrName);
            setShowModal(true);
            setTimeout(() => setIsModalOpen(true), 10);
        } else {
            handleCloseModal();
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        if (isModalOpen) {
            gsap.fromTo(
                modalRef.current,
                { x: '100%', opacity: 0 },
                { x: '0%', opacity: 1, duration: 0.5, ease: 'power3.out' }
            );
        } else if (showModal) {
            gsap.to(modalRef.current, {
                x: '100%',
                opacity: 0,
                duration: 0.5,
                ease: 'power3.out',
                onComplete: () => setShowModal(false),
            });
        }
    }, [isModalOpen]);
    return (
        <section className=" w-full h-screen text-white overflow-hidden fixed z-[20]">
            <div className="brightness-50 bg-[url('/contactBg.jpg')] w-[110%] h-full absolute top-0 left-1/2 translate-x-[-50%] z-[-1] blur-[4px]" />
            <div className="h-[40%] sm:py-[80px]  sm:h-[70%] flex flex-col justify-center items-center font-secondary ">
                <div className="hidden sm:flex flex-col justify-center items-center text-[36px] mb-[100px]">
                    <p className="mb-10">FRONTEND DEVELOPER</p>
                    <div className="flex gap-[50px]">
                        <p>김미선</p>
                        <p className="opacity-50">Design</p>
                    </div>
                </div>
                <div className="flex w-full justify-center gap-[10px]">
                    <p className="font-primaryRegular text-[24px] hidden sm:block">since</p>
                    <p className="text-[clamp(40px,11vw,72px)] sm:text-[clamp(72px,9vw,100px)] md:text-[clamp(100px,6vw,128px)]">
                        CONTACT ME?
                    </p>
                    <p className="font-primaryRegular text-[24px] hidden sm:block">2025</p>
                </div>
            </div>
            <div className="flex flex-col sm:flex-row w-full justify-between sm:justify-center px-[55px] py-0 sm:py-8 border-y border-y-[#9D9D9D] h-[60%] sm:h-[30%] bg-[rgba(108,108,108,0.1)] backdrop-blur-lg text-[24px]">
                <div
                    className="flex items-center sm:items-start sm:flex-col justify-between h-1/3 sm:h-auto w-full sm:w-1/3 py-7 sm:py-0 border-b  border-b-[#9d9d9d] sm:border-b-0 sm:border-r sm:border-r-[#9D9D9D] px-5 cursor-pointer"
                    onClick={() => handleOpenModal('recruit')}
                >
                    <div className="flex flex-col gap-2">
                        <p className="text-[12px]">①</p>
                        <p>이력서</p>
                    </div>
                    <img src="/arrow-right.svg" className="w-[24px] h-[24px]" />
                </div>
                <div
                    className="flex items-center sm:items-start sm:flex-col justify-between h-1/3 sm:h-auto w-full sm:w-1/3 py-7 sm:py-0 border-b  border-b-[#9d9d9d] sm:border-b-0 sm:border-r sm:border-r-[#9D9D9D] px-5 cursor-pointer"
                    onClick={() => handleOpenModal('email')}
                >
                    <div className="flex flex-col gap-2 cursor-pointer">
                        <p className="text-[12px]">②</p>
                        <p>이메일</p>
                    </div>
                    <img src="/arrow-right.svg" className="w-[24px] h-[24px]" />
                </div>{' '}
                <div
                    className="flex items-center sm:items-start sm:flex-col justify-between h-1/3 sm:h-auto w-full sm:w-1/3 py-7 sm:py-0 border-b  border-b-[#9d9d9d] sm:border-b-0 px-5 cursor-pointer"
                    onClick={() => handleOpenModal('sns')}
                >
                    <div className="flex flex-col gap-2">
                        <p className="text-[12px]">③</p>
                        <p>SNS</p>
                    </div>
                    <img src="/arrow-right.svg" className="w-[24px] h-[24px]" />
                </div>
            </div>
            {showModal && (
                <div
                    ref={modalRef}
                    className="py-[110px] absolute top-0 right-[55px] w-[75%] sm:w-[50%] md:w-[36%] h-full"
                >
                    <Card modalName={modalName} handleCloseModal={handleCloseModal} />
                </div>
            )}
        </section>
    );
};

export default Contact;
