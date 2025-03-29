import React from 'react';

const WorkList = ({
    siteLink,
    gitLink,
    imgLink,
    techStack,
    num,
    projectSubject,
    title,
    content,
    ref,
}) => {
    return (
        <div className="w-full h-screen relative" ref={ref}>
            <a href={siteLink} target="_blank" rel="noopener noreferrer">
                <img
                    src={imgLink}
                    className="w-screen h-screen object-cover brightness-40 m-[-5px]"
                />
            </a>
            <div className="absolute top-0 bottom-0 z-[5] text-white w-full h-full p-[15px] py-[60px] sm:p-[60px] flex justify-between flex-col md:flex-row">
                <div className="flex flex-row-reverse md:flex-col items-center md:items-start justify-between text-[clamp(12px,2.5vw,16px)]  sm:text-[clamp(16px,2vw,20px)] md:text-[20px]">
                    <div>{techStack}</div>
                    <p>{num}/3</p>
                    <p className="font-primaryBold text-[clamp(16px,4.7vw,30px)] sm:text-[clamp(30px,4vw,40px)] md:text-[40px]">
                        {projectSubject}
                    </p>
                </div>
                <div className="flex flex-col justify-between h-full md:h-auto text-[clamp(16px,4.7vw,30px)] sm:text-[clamp(30px,4vw,40px)] md:text-[40px] font-primaryBold">
                    <div className="flex items-start gap-[10px]">
                        <img src="/corner-down-right-w.svg" />
                        <div className="font-primaryRegular text-[clamp(12px,2.5vw,16px)]  sm:text-[clamp(16px,2vw,20px)] md:text-[20px]">
                            <p>{title} 하였습니다.</p>
                            <p>{content}</p>
                        </div>
                    </div>
                    <div>
                        <a href={siteLink} target="_blank" rel="noopener noreferrer">
                            <p>Go Site</p>
                        </a>
                        <a href={gitLink} target="_blank" rel="noopener noreferrer">
                            <p>Go Github</p>
                        </a>
                    </div>
                    <div>{title}</div>
                </div>
            </div>
        </div>
    );
};

export default WorkList;
