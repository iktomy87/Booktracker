import React from 'react';
import { cn } from '@/lib/utils';

export const CV_CLASSES: Record<string, string> = {
  cv1: 'bg-gradient-to-br from-[#1a2f0e] to-[#3a5a20] text-[#a8c87a]',
  cv2: 'bg-gradient-to-br from-[#0d1a2e] to-[#1e3a5a] text-[#7ab0d0]',
  cv3: 'bg-gradient-to-br from-[#2e0d0d] to-[#6a1e20] text-[#f0b0b0]',
  cv4: 'bg-gradient-to-br from-[#2e2010] to-[#6a4010] text-[#f0d0a0]',
  cv5: 'bg-gradient-to-br from-[#1a1a35] to-[#352a6a] text-[#c0b0f0]',
  cv6: 'bg-gradient-to-br from-[#0a2020] to-[#1a4a40] text-[#80d0c0]',
  cv7: 'bg-gradient-to-br from-[#2a1408] to-[#6a3010] text-[#f0c090]',
  cv8: 'bg-gradient-to-br from-[#200a20] to-[#4a1a50] text-[#e0a0e0]',
};

interface BookCoverProps {
  title: string;
  variant: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const BookCover = ({ title, variant, size = 'md', className }: BookCoverProps) => {
  const sizeClasses = {
    sm: 'h-[62px] w-11 text-[7px] p-1 rounded',
    md: 'h-[74px] w-[52px] text-[7px] p-1 rounded-lg',
    lg: 'h-[112px] w-20 text-[9px] p-2 rounded-lg',
    xl: 'h-[196px] w-[140px] text-[11px] p-3 rounded-xl',
  };

  const shadowClasses = {
    sm: 'shadow-[2px_3px_10px_rgba(42,31,20,0.15)]',
    md: 'shadow-[2px_3px_10px_rgba(42,31,20,0.18)]',
    lg: 'shadow-[5px_7px_22px_rgba(0,0,0,0.3)]',
    xl: 'shadow-[6px_8px_24px_rgba(42,31,20,0.2)]',
  };

  return (
    <div className={cn(
      "flex flex-shrink-0 items-center justify-center text-center font-playfair font-bold leading-tight tracking-wider uppercase transition-all",
      sizeClasses[size],
      shadowClasses[size],
      CV_CLASSES[variant] || CV_CLASSES.cv1,
      className
    )}>
      {title.split(' ').slice(0, 4).join('')}
    </div>
  );
};
