import React from 'react';
import { cn } from '@/lib/utils';

interface ReadingCardProps {
  id: number;
  title: string;
  author: string;
  currentPage: number;
  totalPages: number;
  streak?: string;
  lastRead?: string;
  isPaused?: boolean;
  coverVariant: string;
  onUpdateProgress?: (id: number) => void;
}

export const ReadingCard = ({
  id,
  title,
  author,
  currentPage,
  totalPages,
  streak,
  lastRead,
  isPaused = false,
  coverVariant,
  onUpdateProgress,
}: ReadingCardProps) => {
  const progress = Math.round((currentPage / (totalPages || 1)) * 100);
  
  // ... (getCoverStyles remains same)
  const getCoverStyles = (variant: string) => {
    const variants: Record<string, string> = {
      cv1: 'bg-gradient-to-br from-[#1a2f0e] to-[#3a5a20] text-[#a8c87a]',
      cv2: 'bg-gradient-to-br from-[#0d1a2e] to-[#1e3a5a] text-[#7ab0d0]',
      cv3: 'bg-gradient-to-br from-[#2e0d0d] to-[#6a1e20] text-[#f0b0b0]',
      cv4: 'bg-gradient-to-br from-[#2e2010] to-[#6a4010] text-[#f0d0a0]',
      cv5: 'bg-gradient-to-br from-[#1a1a35] to-[#352a6a] text-[#c0b0f0]',
    };
    return variants[variant] || variants.cv1;
  };

  return (
    <div className={cn(
      "group relative overflow-hidden rounded-[20px] border border-landing-sand bg-landing-warm-white p-[26px] transition-all hover:-translate-y-1 hover:shadow-[0_14px_36px_rgba(42,31,20,0.09)]",
      isPaused && "opacity-75"
    )}>
      {/* ... (rest of the card remains same) */}
      <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-[20px] bg-gradient-to-b from-landing-red to-landing-red-light" />

      <div className="flex gap-6">
        <div className={cn(
          "flex h-[112px] w-20 flex-shrink-0 items-center justify-center p-2 text-center font-playfair text-[9px] font-bold leading-tight tracking-wider uppercase shadow-[4px_4px_16px_rgba(42,31,20,0.2)] rounded-lg",
          getCoverStyles(coverVariant)
        )}>
          {title}
        </div>

        <div className="flex flex-1 flex-col min-w-0">
          <div className={cn(
            "mb-1.5 text-[10.5px] font-semibold tracking-widest uppercase",
            isPaused ? "text-landing-text-muted" : "text-[#b06820]"
          )}>
            {isPaused ? "⏸ En pausa" : "📖 Leyendo"}
          </div>
          
          <h3 className="mb-0.5 font-playfair text-[17px] font-medium leading-[1.25] text-landing-dark truncate">
            {title}
          </h3>
          <p className="mb-auto pb-3.5 text-[12.5px] text-landing-red">
            {author}
          </p>

          <div className="mt-auto">
            <div className="mb-1.5 flex justify-between text-[11.5px] text-landing-text-muted">
              <span>Página <strong className="font-medium text-landing-dark">{currentPage}</strong> de {totalPages || '—'}</span>
              <strong className="font-medium text-landing-dark">{progress}%</strong>
            </div>
            <div className="h-[5px] w-full rounded-[3px] bg-landing-sand overflow-hidden">
              <div 
                className={cn(
                  "h-full rounded-[3px] transition-all duration-1000",
                  isPaused 
                    ? "bg-gradient-to-r from-landing-text-muted to-landing-tan" 
                    : "bg-gradient-to-r from-landing-red to-landing-red-light"
                )}
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between">
            {streak && (
              <span className="text-[11.5px] text-landing-text-muted flex items-center gap-1">
                🔥 {streak}
              </span>
            )}
            {lastRead && (
              <span className="text-[11.5px] text-landing-text-muted">
                {lastRead}
              </span>
            )}
            <button 
              onClick={() => onUpdateProgress?.(id)}
              className="rounded-full border border-landing-sand bg-transparent px-3.5 py-1.5 font-dm-sans text-[11.5px] text-landing-text-muted transition-all hover:bg-landing-dark hover:text-landing-warm-white hover:border-landing-dark"
            >
              {isPaused ? "Reanudar" : "Actualizar página"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
