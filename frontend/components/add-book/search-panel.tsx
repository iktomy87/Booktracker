import React, { useState, useEffect } from 'react';
import { Search, ArrowRight, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { BookCover } from './book-cover';

export interface Book {
  id: number;
  title: string;
  author: string;
  year: string;
  pages: number;
  genre: string;
  cv: string;
  rating: number;
  reviews: string;
  tags: string[];
}

const MOCK_BOOKS: Book[] = [
  { id: 1, title: 'Cien Años de Soledad', author: 'Gabriel García Márquez', year: '1967', pages: 471, genre: 'Realismo mágico', cv: 'cv1', rating: 4.9, reviews: '12k', tags: ['Latinoam.', 'Premio Nobel'] },
  { id: 2, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', year: '1925', pages: 180, genre: 'Ficción americana', cv: 'cv2', rating: 4.7, reviews: '9.2k', tags: ['Clásico', 'Jazz Age'] },
  { id: 3, title: 'Asesinato en el Orient Express', author: 'Agatha Christie', year: '1934', pages: 256, genre: 'Misterio', cv: 'cv3', rating: 4.8, reviews: '8k', tags: ['Poirot', 'Thriller'] },
  { id: 4, title: 'El Señor de los Anillos', author: 'J.R.R. Tolkien', year: '1954', pages: 1216, genre: 'Fantasía épica', cv: 'cv5', rating: 4.9, reviews: '18k', tags: ['Fantasía', 'Épico'] },
  { id: 5, title: '1984', author: 'George Orwell', year: '1949', pages: 328, genre: 'Distopía', cv: 'cv4', rating: 4.8, reviews: '15k', tags: ['Distopía', 'Política'] },
  { id: 6, title: 'Pedro Páramo', author: 'Juan Rulfo', year: '1955', pages: 124, genre: 'Realismo mágico', cv: 'cv6', rating: 4.6, reviews: '5k', tags: ['Mexicano', 'Clásico'] },
  { id: 7, title: 'Crimen y Castigo', author: 'Fiódor Dostoievski', year: '1866', pages: 545, genre: 'Novela psicológica', cv: 'cv7', rating: 4.7, reviews: '10k', tags: ['Ruso', 'Psicológico'] },
  { id: 8, title: 'La Casa de los Espíritus', author: 'Isabel Allende', year: '1982', pages: 433, genre: 'Realismo mágico', cv: 'cv8', rating: 4.7, reviews: '7.5k', tags: ['Chileno', 'Saga'] },
];

interface SearchPanelProps {
  onSelectBook: (book: Book) => void;
  onGoToManual: () => void;
  selectedBook: Book | null;
}

export const SearchPanel = ({ onSelectBook, onGoToManual, selectedBook }: SearchPanelProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (searchQuery.length < 2) {
      setResults([]);
      return;
    }

    setIsLoading(true);
    const timer = setTimeout(() => {
      const matches = MOCK_BOOKS.filter(b => 
        b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.author.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setResults(matches);
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  return (
    <div className="animate-fade-up">
      <div className="mb-9 text-center">
        <h1 className="font-playfair text-[32px] font-medium text-landing-dark">
          ¿Qué libro quieres <em className="italic text-landing-red not-italic">añadir?</em>
        </h1>
        <p className="mt-1 text-[14px] font-light text-landing-text-muted">
          Busca por título, autor o ISBN. Si no lo encuentras, puedes crearlo.
        </p>
      </div>

      <div className="relative mb-5">
        <Search className="absolute left-5 top-1/2 size-5 -translate-y-1/2 text-landing-text-muted" />
        <input 
          type="text"
          placeholder="Ej: Cien años de soledad, García Márquez, 978-…"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full rounded-2xl border-2 border-landing-sand bg-landing-warm-white py-4.5 pl-13 pr-6 text-[16px] text-landing-dark shadow-[0_4px_20px_rgba(42,31,20,0.06)] outline-none transition-all focus:border-landing-red focus:shadow-[0_0_0_4px_rgba(140,32,48,0.07),0_4px_20px_rgba(42,31,20,0.06)]"
        />
      </div>

      <div className="mb-7 flex flex-wrap gap-2">
        {['Todos', 'Ficción', 'Clásicos', 'Misterio', 'Fantasía', 'Poesía', 'Ensayo'].map((f, i) => (
          <button 
            key={f}
            className={cn(
              "rounded-full border border-landing-sand px-3.5 py-1.5 text-[12px] transition-all hover:border-landing-tan hover:text-landing-text",
              i === 0 ? "bg-landing-dark text-landing-warm-white border-landing-dark" : "text-landing-text-muted"
            )}
          >
            {f}
          </button>
        ))}
      </div>

      {searchQuery.length < 2 ? (
        <div className="py-14 text-center">
          <div className="mb-3 text-4xl opacity-40">📚</div>
          <p className="text-[14px] font-light text-landing-text-muted">
            Empieza a escribir para buscar en más de 12.000 títulos
          </p>
        </div>
      ) : isLoading ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="flex gap-4 rounded-2xl border border-landing-sand bg-landing-warm-white p-5">
              <div className="h-[74px] w-[52px] animate-pulse rounded-lg bg-landing-sand" />
              <div className="flex flex-1 flex-col gap-2 pt-1">
                <div className="h-3.5 w-[80%] animate-pulse rounded bg-landing-sand" />
                <div className="h-2.5 w-[55%] animate-pulse rounded bg-landing-sand" />
                <div className="h-2.5 w-[40%] animate-pulse rounded bg-landing-sand" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="mb-7">
          <div className="mb-4 flex items-center justify-between text-[11px] font-semibold tracking-widest text-landing-text-muted uppercase">
            Resultados
            <span className="font-playfair text-[14px] font-normal tracking-normal text-landing-dark lowercase">
              {results.length} resultados
            </span>
          </div>
          
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {results.map(book => (
              <div 
                key={book.id}
                onClick={() => onSelectBook(book)}
                className={cn(
                  "group relative flex cursor-pointer gap-4 overflow-hidden rounded-2xl border-2 p-5 transition-all hover:-translate-y-0.5 hover:border-landing-tan hover:shadow-[0_8px_24px_rgba(42,31,20,0.08)]",
                  selectedBook?.id === book.id ? "border-landing-red shadow-[0_0_0_3px_rgba(140,32,48,0.1)]" : "border-landing-sand bg-landing-warm-white"
                )}
              >
                <BookCover title={book.title} variant={book.cv} size="md" />
                <div className="flex flex-1 flex-col min-w-0 pr-5">
                  <h3 className="mb-0.5 font-playfair text-[14.5px] font-medium leading-tight text-landing-dark truncate">
                    {book.title}
                  </h3>
                  <p className="mb-1.5 text-[12px] text-landing-red truncate">
                    {book.author}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="rounded-full border border-landing-sand px-2 py-0.5 text-[10px] text-landing-text-muted">{book.year}</span>
                    <span className="rounded-full border border-landing-sand px-2 py-0.5 text-[10px] text-landing-text-muted">{book.pages} pág.</span>
                  </div>
                </div>
                <div className={cn(
                  "absolute top-3 right-3 flex h-5 w-5 items-center justify-center rounded-full border-2 transition-all",
                  selectedBook?.id === book.id ? "bg-landing-red border-landing-red text-white" : "border-landing-sand"
                )}>
                  {selectedBook?.id === book.id && <Check className="size-3" />}
                </div>
              </div>
            ))}
          </div>

          <div 
            onClick={onGoToManual}
            className="group mt-6 flex cursor-pointer items-center gap-5.5 rounded-2xl border border-dashed border-landing-tan bg-landing-warm-white p-6.5 transition-all hover:bg-[#fdf6f0] hover:border-landing-red"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-landing-sand bg-landing-cream text-[22px]">✏️</div>
            <div className="flex-1">
              <h4 className="font-playfair text-[15px] font-medium text-landing-dark">¿No encontrás tu libro?</h4>
              <p className="text-[12.5px] font-light text-landing-text-muted">Crealo manualmente con título, autor y portada propia</p>
            </div>
            <ArrowRight className="size-5 text-landing-text-muted transition-transform group-hover:translate-x-1 group-hover:text-landing-red" />
          </div>
        </div>
      )}
    </div>
  );
};
