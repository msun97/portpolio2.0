import Card from '@/components/contact/Card';
import { useState } from 'react';

const Contact = () => {
    const [modalName, setModalName] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleOpenModal = (name: string) => {
        setIsModalOpen(!isModalOpen);
        setModalName(name);
    };
    return (
        <section className=" w-full h-screen text-white overflow-hidden fixed z-[20]">
            <div className="brightness-50 bg-[url('/contactBg.jpg')] w-[110%] h-full absolute top-0 left-1/2 translate-x-[-50%] z-[-1] blur-[4px]" />
            <div className="py-[80px]  h-[70%] flex flex-col justify-center items-center font-secondary ">
                <div className="flex flex-col justify-center items-center text-[36px] mb-[100px]">
                    <p className="mb-10">FRONTEND DEVELOPER</p>
                    <div className="flex gap-[50px]">
                        <p>김미선</p>
                        <p className="opacity-50">Design</p>
                    </div>
                </div>
                <div className="flex w-full justify-center gap-[10px]">
                    <p className="font-primaryRegular text-[24px]">since</p>
                    <p className="text-[128px]">CONTACT ME?</p>
                    <p className="font-primaryRegular text-[24px]">2025</p>
                </div>
            </div>
            <div className="flex  w-full justify-center px-[55px] py-8 border-y border-y-[#9D9D9D] h-[30%] bg-[rgba(108,108,108,0.1)] backdrop-blur-lg text-[24px]">
                <div
                    className="flex flex-col justify-between w-1/3 border-r border-r-[#9D9D9D] px-5 cursor-pointer"
                    onClick={() => handleOpenModal('recruit')}
                >
                    <div className="flex flex-col gap-2">
                        <p className="text-[12px]">①</p>
                        <p>이력서</p>
                    </div>
                    <img src="/arrow-right.svg" className="w-[24px] h-[24px]" />
                </div>
                <div
                    className="flex flex-col justify-between w-1/3 px-5  border-r border-r-[#9D9D9D] cursor-pointer"
                    onClick={() => handleOpenModal('email')}
                >
                    <div className="flex flex-col gap-2 cursor-pointer">
                        <p className="text-[12px]">②</p>
                        <p>이메일</p>
                    </div>
                    <img src="/arrow-right.svg" className="w-[24px] h-[24px]" />
                </div>{' '}
                <div
                    className="flex flex-col justify-between w-1/3 px-5 cursor-pointer"
                    onClick={() => handleOpenModal('sns')}
                >
                    <div className="flex flex-col gap-2">
                        <p className="text-[12px]">③</p>
                        <p>SNS</p>
                    </div>
                    <img src="/arrow-right.svg" className="w-[24px] h-[24px]" />
                </div>
            </div>
            {isModalOpen ? (
                <div className=" py-[110px] absolute top-0 right-[55px] w-[36%] h-full">
                    <Card modalName={modalName} handleOpenModal={handleOpenModal} />
                </div>
            ) : (
                ''
            )}
        </section>
    );
};

export default Contact;
