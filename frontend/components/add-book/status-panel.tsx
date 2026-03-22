import React, { useState } from 'react';
import { Star, X, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { BookCover } from './book-cover';
import { Book } from './search-panel';

export type BookStatus = 'reading' | 'finished' | 'wishlist';

interface StatusPanelProps {
  selectedBook: Book;
  onFinish: (status: BookStatus, details: any) => void;
  onBack: () => void;
}

export const StatusPanel = ({ selectedBook, onFinish, onBack }: StatusPanelProps) => {
  const [status, setStatus] = useState<BookStatus | null>(null);
  const [rating, setRating] = useState(0);
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  
  // New input states
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [notes, setNotes] = useState('');

  const handleAddTag = (e: React.KeyboardEvent) => {
    if ((e.key === 'Enter' || e.key === ',') && tagInput.trim()) {
      e.preventDefault();
      const newTag = tagInput.trim().replace(/,/g, '');
      if (!tags.includes(newTag)) {
        setTags([...tags, newTag]);
      }
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(t => t !== tagToRemove));
  };

  const handleComplete = () => {
    if (!status) return;
    onFinish(status, { 
      rating, 
      tags,
      currentPage,
      startDate,
      endDate,
      notes
    });
  };

  return (
    <div className="animate-fade-up">
      {/* ... (Selected book preview remains same) */}
      <div className="relative mb-7 flex items-start gap-6 overflow-hidden rounded-[20px] bg-landing-dark p-8 text-landing-warm-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_50%,rgba(140,32,48,0.3)_0%,transparent_60%)] pointer-events-none" />
        <BookCover title={selectedBook.title} variant={selectedBook.cv} size="lg" className="relative z-10" />
        <div className="relative z-10 flex-1">
          <div className="mb-1 text-[10px] tracking-widest text-white/45 uppercase">Libro seleccionado</div>
          <h2 className="mb-0.5 font-playfair text-[23px] font-medium leading-tight">{selectedBook.title}</h2>
          <p className="mb-3.5 text-[13.5px] text-[#e8a0a8]">{selectedBook.author}</p>
          <div className="flex flex-wrap gap-1.5">
            <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-[10.5px] text-white/70">{selectedBook.year}</span>
            <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-[10.5px] text-white/70">{selectedBook.pages > 0 ? `${selectedBook.pages} pág.` : "Manual"}</span>
            <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-[10.5px] text-white/70">{selectedBook.genre}</span>
          </div>
        </div>
        <button 
          onClick={onBack}
          className="relative z-10 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[11px] text-white/75 transition-all hover:bg-white/20 hover:text-white"
        >
          ← Cambiar
        </button>
      </div>

      {/* ... (Status selector remains same) */}
      <div className="mb-7 flex flex-col gap-3.5">
        <div className="text-[11.5px] font-semibold tracking-widest text-landing-text-muted uppercase">¿En qué estado está este libro para ti?</div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {[
            { id: 'reading', icon: '📖', name: 'Leyendo ahora', desc: 'Lo estoy leyendo' },
            { id: 'finished', icon: '✅', name: 'Ya lo leí', desc: 'Lo terminé en el pasado' },
            { id: 'wishlist', icon: '📚', name: 'Quiero leerlo', desc: 'Añadir a mi lista' }
          ].map(s => (
            <button 
              key={s.id}
              onClick={() => setStatus(s.id as BookStatus)}
              className={cn(
                "flex flex-col items-center rounded-2xl border-2 p-4 text-center transition-all",
                status === s.id ? "bg-landing-red/5 border-landing-red" : "bg-landing-warm-white border-landing-sand hover:border-landing-tan"
              )}
            >
              <span className="mb-1.5 text-2xl">{s.icon}</span>
              <span className="mb-0.5 text-[13px] font-medium text-landing-dark">{s.name}</span>
              <span className="text-[11.5px] font-light text-landing-text-muted">{s.desc}</span>
            </button>
          ))}
        </div>
      </div>

      {status === 'reading' && (
        <div className="mb-6 animate-fade-up">
          <div className="mb-3 text-[11.5px] font-semibold tracking-widest text-landing-text-muted uppercase">Detalle de progreso</div>
          <div className="grid grid-cols-2 gap-3.5">
            <div className="flex flex-col gap-1.5">
              <label className="text-[12px] font-medium text-landing-text-muted">Página actual</label>
              <input 
                type="number" 
                placeholder="Ej: 120" 
                value={currentPage}
                onChange={(e) => setCurrentPage(parseInt(e.target.value) || 0)}
                className="rounded-xl border border-landing-sand bg-landing-cream px-4 py-2.5 text-[14px] text-landing-dark outline-none focus:border-landing-red" 
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[12px] font-medium text-landing-text-muted">Fecha de inicio</label>
              <input 
                type="date" 
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="rounded-xl border border-landing-sand bg-landing-cream px-4 py-2.5 text-[14px] text-landing-dark outline-none focus:border-landing-red" 
              />
            </div>
          </div>
        </div>
      )}

      {status === 'finished' && (
        <div className="mb-6 animate-fade-up">
          <div className="mb-3 text-[11.5px] font-semibold tracking-widest text-landing-text-muted uppercase">Detalle de lectura</div>
          <div className="grid grid-cols-2 gap-3.5 mb-5">
            <div className="flex flex-col gap-1.5">
              <label className="text-[12px] font-medium text-landing-text-muted">Fecha de inicio</label>
              <input 
                type="date" 
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="rounded-xl border border-landing-sand bg-landing-cream px-4 py-2.5 text-[14px] text-landing-dark outline-none focus:border-landing-red" 
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[12px] font-medium text-landing-text-muted">Fecha de fin</label>
              <input 
                type="date" 
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="rounded-xl border border-landing-sand bg-landing-cream px-4 py-2.5 text-[14px] text-landing-dark outline-none focus:border-landing-red" 
              />
            </div>
          </div>
          <div className="mb-5 flex flex-col gap-1.5">
            <label className="text-[12px] font-medium text-landing-text-muted uppercase tracking-wider">Tu valoración</label>
            <div className="flex gap-1.5">
              {[1, 2, 3, 4, 5].map(v => (
                <Star 
                  key={v} 
                  onClick={() => setRating(v)}
                  className={cn(
                    "size-7 cursor-pointer transition-all hover:scale-110",
                    v <= rating ? "fill-amber-400 stroke-amber-400" : "stroke-landing-sand"
                  )} 
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {status && (
        <div className="mb-6 animate-fade-up">
          <div className="mb-3 text-[11.5px] font-semibold tracking-widest text-landing-text-muted uppercase">Etiquetas personales</div>
          <div 
            onClick={() => document.getElementById('tag-input')?.focus()}
            className="flex flex-wrap items-center gap-1.5 rounded-xl border border-landing-sand bg-landing-cream p-2.5 transition-all focus-within:border-landing-red"
          >
            {tags.map(t => (
              <span key={t} className="flex items-center gap-1.5 rounded-full bg-landing-dark px-2.5 py-1 text-[11.5px] text-landing-warm-white">
                {t} <X onClick={() => removeTag(t)} className="size-3 cursor-pointer opacity-60 hover:opacity-100" />
              </span>
            ))}
            <input 
              id="tag-input"
              type="text"
              placeholder="Añadir etiqueta y presionar Enter…"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleAddTag}
              className="flex-1 min-w-[120px] border-none bg-transparent text-[13px] text-landing-dark outline-none placeholder:text-landing-text-muted"
            />
          </div>
          
          <div className="mt-6">
            <div className="mb-3 text-[11.5px] font-semibold tracking-widest text-landing-text-muted uppercase">Notas privadas (opcional)</div>
            <textarea 
              placeholder="Algo que quieras recordar sobre este libro…"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full rounded-xl border border-landing-sand bg-landing-cream px-4 py-3 text-[14px] text-landing-dark outline-none focus:border-landing-red min-h-[80px] resize-none"
            />
          </div>
        </div>
      )}


      <div className="sticky bottom-0 -mx-10 mt-10 flex items-center justify-between border-t border-landing-sand bg-landing-cream/95 px-10 py-4 backdrop-blur-md">
        <span className="text-[13px] text-landing-text-muted">
          {status ? <span>Estado: <strong>{status === 'reading' ? 'Leyendo' : status === 'finished' ? 'Terminado' : 'Lista de deseos'}</strong></span> : "Selecciona el estado del libro"}
        </span>
        <div className="flex gap-3">
          <button 
            onClick={onBack}
            className="rounded-full border border-landing-sand px-5 py-2.5 text-[13.5px] text-landing-text-muted transition-all hover:border-landing-tan hover:text-landing-text"
          >
            ← Atrás
          </button>
          <button 
            disabled={!status}
            onClick={handleComplete}
            className="flex items-center gap-1.5 rounded-full bg-landing-dark px-7 py-2.5 text-[13.5px] font-medium text-landing-warm-white transition-all hover:bg-landing-red enabled:hover:-translate-y-px disabled:bg-landing-sand disabled:text-landing-text-muted disabled:cursor-not-allowed"
          >
            Añadir a mi biblioteca <CheckCircle2 className="size-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
