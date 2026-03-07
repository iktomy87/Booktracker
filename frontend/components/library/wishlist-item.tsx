import React from 'react';
import { cn } from '@/lib/utils';

interface WishlistItemProps {
  rank: string;
  title: string;
  author: string;
  tags: string[];
  addedDate: string;
  coverVariant: string;
}

export const WishlistItem = ({
  rank,
  title,
  author,
  tags,
  addedDate,
  coverVariant,
}: WishlistItemProps) => {
  const getCoverStyles = (variant: string) => {
    const variants: Record<string, string> = {
      cv1: 'bg-gradient-to-br from-[#1a2f0e] to-[#3a5a20] text-[#a8c87a]',
      cv2: 'bg-gradient-to-br from-[#0d1a2e] to-[#1e3a5a] text-[#7ab0d0]',
      cv3: 'bg-gradient-to-br from-[#2e0d0d] to-[#6a1e20] text-[#f0b0b0]',
      cv4: 'bg-gradient-to-br from-[#2e2010] to-[#6a4010] text-[#f0d0a0]',
      cv5: 'bg-gradient-to-br from-[#1a1a35] to-[#352a6a] text-[#c0b0f0]',
      cv6: 'bg-gradient-to-br from-[#0a2020] to-[#1a4a40] text-[#80d0c0]',
      cv7: 'bg-gradient-to-br from-[#2a1408] to-[#6a3010] text-[#f0c090]',
      cv8: 'bg-gradient-to-br from-[#200a20] to-[#4a1a50] text-[#e0a0e0]',
      cv9: 'bg-gradient-to-br from-[#0a1a0a] to-[#203820] text-[#90d090]',
      cv10: 'bg-gradient-to-br from-[#1e1408] to-[#403018] text-[#d4b880]',
    };
    return variants[variant] || variants.cv1;
  };

  return (
    <div className="flex cursor-pointer items-center gap-4 rounded-2xl border border-landing-sand bg-landing-warm-white p-4 transition-all hover:translate-x-1 hover:shadow-[0_4px_16px_rgba(42,31,20,0.07)]">
      <div className="w-8 flex-shrink-0 text-center font-playfair text-2xl font-normal text-landing-sand">
        {rank}
      </div>
      
      <div className={cn(
        "flex h-[62px] w-11 flex-shrink-0 items-center justify-center rounded p-1 text-center font-playfair text-[7px] font-bold leading-tight tracking-wider uppercase shadow-[2px_3px_10px_rgba(42,31,20,0.15)]",
        getCoverStyles(coverVariant)
      )}>
        {title}
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="font-playfair text-[14.5px] font-medium leading-tight text-landing-dark truncate">
          {title}
        </h3>
        <p className="mb-1.5 text-[12px] text-landing-red truncate">
          {author}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <span key={tag} className="rounded-full border border-landing-sand px-2 py-0.5 text-[10.5px] text-landing-text-muted">
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="flex flex-shrink-0 flex-col items-end">
        <div className="mb-2 text-[11.5px] text-landing-text-muted">
          {addedDate}
        </div>
        <button className="rounded-full bg-landing-dark px-3.5 py-1.5 font-dm-sans text-[11.5px] font-medium text-landing-warm-white transition-colors hover:bg-landing-red whitespace-nowrap">
          Empezar a leer →
        </button>
      </div>
    </div>
  );
};
