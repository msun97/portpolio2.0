import Link from 'next/link';
import React, { useMemo } from 'react';

const Card = ({
    modalName,
    handleOpenModal,
}: {
    modalName: string | null;
    handleOpenModal: (name: string) => void;
}) => {
    const data = useMemo(() => {
        switch (modalName) {
            case 'recruit':
                return [
                    {
                        id: 1,
                        title: '다운 받기',
                        link: 'https://drive.google.com/drive/folders/17KHI_vdVBZch6hGUGlbtzlFg9AOYFlRy?usp=drive_link',
                        subtitle: 'Going to Google Drive',
                    },
                    {
                        id: 2,
                        title: 'Notion 보러 가기',
                        link: 'https://fishy-snow-15a.notion.site/1bbc042b45b6802aad02e161557c5d49',
                        subtitle: 'Going to Notion',
                    },
                ];
            case 'email':
                return [
                    {
                        id: 1,
                        title: '이메일',
                        link: 'mailto:miseong827@gmail.com',
                        subtitle: 'miseong827@gmail.com',
                    },
                    {
                        id: 2,
                        title: '휴대폰',
                        link: 'tel:010-2948-0052',
                        subtitle: '010-2948-0052',
                    },
                ];
            case 'sns':
                return [
                    {
                        id: 1,
                        title: 'Github',
                        link: 'https://github.com/msun97',
                        subtitle: 'Go Github',
                    },
                    {
                        id: 2,
                        title: 'Notion',
                        link: 'https://fishy-snow-15a.notion.site/1bdc042b45b680bb8096d0069d0cfda5',
                        subtitle: 'Go Notion',
                    },
                    {
                        id: 3,
                        title: 'Blog',
                        link: 'https://hollypp.tistory.com/',
                        subtitle: 'Go Blog',
                    },
                ];
            default:
                return [];
        }
    }, [modalName]);
    return (
        <div className="bg-[#D9D9D9] h-full rounded-[20px] px-[75px] py-[110px] text-black font-secondary text-[24px] relative">
            <img
                src="/x.svg"
                className="w-[24px] h-[24px] absolute top-[30px] right-[20px] cursor-pointer"
                onClick={() => handleOpenModal()}
            />
            <ul className="flex flex-col gap-[50px] ">
                {data.map((item) => {
                    return (
                        <li key={item.id} className="flex justify-between gap-4">
                            <p className="border h-[24px] w-[24px] p-1 rounded-full flex items-center justify-center text-[16px]">
                                {item.id}
                            </p>
                            <div className="flex flex-col gap-4 flex-1">
                                <p>{item.title}</p>
                                <Link href={item.link} target="_blank" rel="noreferrer">
                                    <p className="text-[16px] font-primaryRegular">
                                        {item.subtitle}
                                    </p>
                                </Link>
                            </div>
                            <Link href={item.link} target="_blank" rel="noreferrer">
                                <img src="/arrow-down.svg" className="w-[24px] h-[24px]" />
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default Card;
