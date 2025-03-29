import React from 'react';

interface TagProps {
    children: React.ReactNode;
    color: string;
    style?: React.CSSProperties; // style은 선택적 속성
    className?: string; // className은 선택적 속성
    ref?: React.Ref<HTMLDivElement>; // ref는 선택적 속성
}

const Tag = React.forwardRef<HTMLDivElement, TagProps>(
    ({ children, color, style, className }, ref) => {
        return (
            <div
                ref={ref}
                className={`p-1 w-fit text-[14px] absolute z-10 md:text-[19px] md:p-2 overflow-hidden whitespace-nowrap ${className}`}
                style={{ backgroundColor: color, ...style }}
            >
                {children}
            </div>
        );
    }
);

Tag.displayName = 'Tag';
export default Tag;
