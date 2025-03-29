import React from 'react';

const Card = () => {
    return (
        <div className="bg-[#D9D9D9] h-full rounded-[20px] px-[75px] py-[110px] text-black font-secondary text-[24px] relative">
            <img src="/x.svg" className="w-[24px] h-[24px] absolute top-[30px] right-[20px]" />
            <ul className="flex flex-col gap-[50px] ">
                <li className="flex justify-between">
                    <p className="w-[10%]">①</p>
                    <div className="flex flex-col gap-4 flex-1">
                        <p>다운 받기</p>
                        <p className="text-[16px] font-primaryRegular">Going to Google Drive</p>
                    </div>
                    <img src="/arrow-down.svg" className="w-[24px] h-[24px]" />
                </li>
                <li className="flex justify-between">
                    <p className="w-[10%]">②</p>
                    <div className="flex flex-col gap-4 flex-1">
                        <p>Notion 보러 가기</p>
                        <p className="text-[16px] font-primaryRegular">Going to Notion</p>
                    </div>
                    <img src="/arrow-down.svg" className="w-[24px] h-[24px]" />
                </li>
            </ul>
        </div>
    );
};

export default Card;
