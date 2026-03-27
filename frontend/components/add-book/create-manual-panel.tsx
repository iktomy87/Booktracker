import React, { useState } from 'react';
import { Upload } from 'lucide-react';
import { cn } from '@/lib/utils';
import { BookCover, CV_CLASSES } from './book-cover';
import { Book } from './search-panel';

interface CreateManualPanelProps {
  onManualSubmit: (book: Book) => void;
  onBack: () => void;
}

export const CreateManualPanel = ({ onManualSubmit, onBack }: CreateManualPanelProps) => {
  const [manualBook, setManualBook] = useState({
    title: '',
    author: '',
    cv: 'cv1',
  });

  const handleSubmit = () => {
    if (!manualBook.title) return;
    const book: Book = {
      id: Date.now(),
      name: manualBook.title,
      authors: manualBook.author || 'Autor desconocido',
      year: '2024',
      pages: 0,
      genre: 'Manual',
      cv: manualBook.cv,
      rating: 0,
      reviews: '0',
      tags: [],
    };
    onManualSubmit(book);
  };

  return (
    <div className="animate-fade-up">
      <div className="mb-6">
        <h2 className="font-playfair text-[26px] font-medium text-landing-dark">Crear libro manualmente</h2>
        <p className="text-[13.5px] font-light text-landing-text-muted">Completa los datos del libro que no está en el catálogo</p>
      </div>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_280px]">
        <div className="flex flex-col gap-4.5">
          <div className="flex flex-col gap-1.5">
            <label className="text-[12px] font-semibold tracking-widest text-landing-text-muted uppercase">Título *</label>
            <input 
              type="text" 
              placeholder="Título del libro"
              value={manualBook.title}
              onChange={(e) => setManualBook({...manualBook, title: e.target.value})}
              className="rounded-xl border border-landing-sand bg-landing-cream px-4 py-3 text-[14px] text-landing-dark outline-none transition-all focus:border-landing-red focus:shadow-[0_0_0_3px_rgba(140,32,48,0.07)]"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-3.5">
            <div className="flex flex-col gap-1.5">
              <label className="text-[12px] font-semibold tracking-widest text-landing-text-muted uppercase">Autor *</label>
              <input 
                type="text" 
                placeholder="Nombre del autor"
                value={manualBook.author}
                onChange={(e) => setManualBook({...manualBook, author: e.target.value})}
                className="rounded-xl border border-landing-sand bg-landing-cream px-4 py-3 text-[14px] text-landing-dark outline-none transition-all focus:border-landing-red focus:shadow-[0_0_0_3px_rgba(140,32,48,0.07)]"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[12px] font-semibold tracking-widest text-landing-text-muted uppercase">Año de publicación</label>
              <input type="number" placeholder="Ej: 2001" className="rounded-xl border border-landing-sand bg-landing-cream px-4 py-3 text-[14px] text-landing-dark outline-none transition-all focus:border-landing-red focus:shadow-[0_0_0_3px_rgba(140,32,48,0.07)]" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3.5">
            <div className="flex flex-col gap-1.5">
              <label className="text-[12px] font-semibold tracking-widest text-landing-text-muted uppercase">Editorial</label>
              <input type="text" placeholder="Ej: Alfaguara" className="rounded-xl border border-landing-sand bg-landing-cream px-4 py-3 text-[14px] text-landing-dark outline-none transition-all focus:border-landing-red focus:shadow-[0_0_0_3px_rgba(140,32,48,0.07)]" />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[12px] font-semibold tracking-widest text-landing-text-muted uppercase">Número de páginas</label>
              <input type="number" placeholder="Ej: 320" className="rounded-xl border border-landing-sand bg-landing-cream px-4 py-3 text-[14px] text-landing-dark outline-none transition-all focus:border-landing-red focus:shadow-[0_0_0_3px_rgba(140,32,48,0.07)]" />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[12px] font-semibold tracking-widest text-landing-text-muted uppercase">Géneros</label>
            <div className="grid grid-cols-4 gap-1.5">
              {['Ficción', 'Clásico', 'Misterio', 'Fantasía', 'Romance', 'Poesía', 'Ensayo', 'Biografía'].map(g => (
                <button key={g} className="rounded-lg border border-landing-sand bg-landing-warm-white py-1.5 text-[11.5px] text-landing-text-muted transition-all hover:border-landing-tan hover:text-landing-text">
                  {g}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="text-[11px] font-semibold tracking-widest text-landing-text-muted uppercase">Portada</div>
          <BookCover title={manualBook.title || "TÍTULO DEL LIBRO"} variant={manualBook.cv} size="xl" className="mx-auto" />
          
          <div className="text-[11px] font-semibold tracking-widest text-landing-text-muted uppercase">Color de fondo</div>
          <div className="grid grid-cols-4 gap-1.5">
            {Object.keys(CV_CLASSES).map(cv => (
              <button 
                key={cv} 
                onClick={() => setManualBook({...manualBook, cv})}
                className={cn(
                  "aspect-square rounded-lg border-2 transition-all",
                  CV_CLASSES[cv],
                  manualBook.cv === cv ? "border-landing-dark shadow-[0_0_0_2px_white]" : "border-transparent"
                )}
              />
            ))}
          </div>
          <div className="mt-2 cursor-pointer rounded-xl border border-dashed border-landing-tan bg-landing-warm-white p-5 text-center transition-all hover:bg-[#fdf6f0] hover:border-landing-red">
            <Upload className="mx-auto mb-1.5 size-5 text-landing-tan" />
            <p className="text-[12px] text-landing-text-muted">Subir imagen</p>
          </div>
        </div>
      </div>

      <div className="sticky bottom-0 -mx-10 mt-10 flex items-center justify-between border-t border-landing-sand bg-landing-cream/95 px-10 py-4 backdrop-blur-md">
        <span className="text-[13px] text-landing-text-muted">* Campos obligatorios</span>
        <div className="flex gap-3">
          <button 
            onClick={onBack}
            className="rounded-full border border-landing-sand px-5 py-2.5 text-[13.5px] text-landing-text-muted transition-all hover:border-landing-tan hover:text-landing-text"
          >
            ← Buscar en catálogo
          </button>
          <button 
            disabled={!manualBook.title}
            onClick={handleSubmit}
            className="flex items-center gap-1.5 rounded-full bg-landing-dark px-7 py-2.5 text-[13.5px] font-medium text-landing-warm-white transition-all hover:bg-landing-red enabled:hover:-translate-y-px disabled:bg-landing-sand disabled:text-landing-text-muted disabled:cursor-not-allowed"
          >
            Continuar con este libro
          </button>
        </div>
      </div>
    </div>
  );
};
