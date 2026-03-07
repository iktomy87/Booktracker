import React from 'react';
import { cn } from '@/lib/utils';
import { Star } from 'lucide-react';

interface FinishedCardProps {
  title: string;
  author: string;
  date: string;
  rating: number;
  coverVariant: string;
}

export const FinishedCard = ({
  title,
  author,
  date,
  rating,
  coverVariant,
}: FinishedCardProps) => {
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
    <div className="group cursor-pointer transition-transform hover:-translate-y-1">
      <div className="relative mb-3">
        <div className={cn(
          "aspect-[2/3] w-full flex items-center justify-center rounded-xl p-3 text-center font-playfair text-[9px] font-bold leading-tight tracking-wider uppercase shadow-[3px_6px_18px_rgba(42,31,20,0.18)] transition-all group-hover:shadow-[6px_12px_28px_rgba(42,31,20,0.25)]",
          getCoverStyles(coverVariant)
        )}>
          {title}
        </div>
        <div className="absolute top-2 right-2 flex h-6 w-6 items-center justify-center rounded-full bg-green-700 text-[10.5px] font-bold text-white shadow-[0_2px_8px_rgba(74,124,63,0.4)]">
          ✓
        </div>
        <div className="absolute bottom-2 left-2 flex items-center gap-1 rounded-md bg-landing-dark/75 px-1.5 py-0.5 text-[10.5px] text-landing-warm-white backdrop-blur-md">
          <Star className="size-2.5 fill-amber-400 stroke-amber-400" /> {rating.toFixed(1)}
        </div>
      </div>
      <h3 className="text-[13px] font-medium leading-tight text-landing-dark truncate">
        {title}
      </h3>
      <p className="text-[12px] text-landing-red truncate">
        {author}
      </p>
      <p className="mt-0.5 text-[11px] text-landing-text-muted">
        {date}
      </p>
    </div>
  );
};
