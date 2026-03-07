import React from 'react';
import { Check, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { BookCover } from './book-cover';
import { Book } from './search-panel';
import { BookStatus } from './status-panel';
import { cn } from '@/lib/utils';

interface SuccessPanelProps {
  selectedBook: Book;
  status: BookStatus;
  onAddAnother: () => void;
}

export const SuccessPanel = ({ selectedBook, status, onAddAnother }: SuccessPanelProps) => {
  const statusMsgs = {
    reading: ' ¡Que disfrutes la lectura!',
    finished: ' Ya está en tu historial.',
    wishlist: ' ¡Lo próximo!'
  };

  return (
    <div className="py-14 text-center animate-fade-up">
      <BookCover title={selectedBook.title} variant={selectedBook.cv} size="xl" className="mx-auto mb-8" />
      
      <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#c5d9b0] bg-[#edf3e8] px-4 py-1.5 text-[12.5px] font-medium text-[#3d6e32]">
        <Check className="size-3.5" /> Añadido a tu biblioteca
      </div>
      
      <h2 className="mb-2 font-playfair text-[30px] font-medium text-landing-dark">
        ¡<em className="italic text-landing-red not-italic">Perfecto</em>, Michelle!
      </h2>
      
      <p className="mx-auto mb-9 max-w-[340px] text-[14px] font-light leading-relaxed text-landing-text-muted">
        <strong>{selectedBook.title}</strong> fue añadido a tu biblioteca. 
        {statusMsgs[status]}
      </p>
      
      <div className="flex justify-center gap-3">
        <button 
          onClick={onAddAnother}
          className="rounded-full bg-landing-dark px-7 py-2.5 text-[13.5px] font-medium text-landing-warm-white transition-all hover:bg-landing-red hover:-translate-y-px"
        >
          + Añadir otro libro
        </button>
        <Link 
          href="/pages/library"
          className="flex items-center gap-1.5 rounded-full border border-landing-sand bg-transparent px-6 py-2.5 text-[13.5px] text-landing-text-muted transition-all hover:border-landing-tan hover:text-landing-text"
        >
          Ver mi biblioteca <ArrowRight className="size-3.5" />
        </Link>
      </div>
    </div>
  );
};
