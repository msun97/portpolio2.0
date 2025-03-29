import React from 'react';

const Tag = ({ children, color, style, className, ref }) => {
    return (
        <div
            ref={ref}
            className={`p-1 w-fit text-[14px] absolute z-10 md:text-[19px] md:p-2 overflow-hidden whitespace-nowrap ${className}`}
            style={{ backgroundColor: color, ...style }}
        >
            {children}
        </div>
    );
};

export default Tag;
