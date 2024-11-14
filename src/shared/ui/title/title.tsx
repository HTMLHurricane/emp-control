import { memo, ReactNode } from 'react';

export const Title = memo(
    ({
        children,
        size,
        className,
    }: {
        children: ReactNode;
        size?: 'xl';
        className?: string;
    }) => {
        return (
            <span
                className={`${
                    size === 'xl' ? 'text-[16px]' : 'text-[16px]'
                }  text-[#645e5e] font-semibold whitespace-nowrap ${className}`}
            >
                {children}
            </span>
        );
    },
);
