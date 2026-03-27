"use client"

import { useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { BookCard } from "@/components/book-card"

interface Book {
  id: number;
  name: string; 
  authors: { name: string }[]; 
  coverUrl?: string; 
}

interface PopularBooksSectionProps {
  books: Book[];
}

export function PopularBooksSection({ books }: PopularBooksSectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 300
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      })
    }
  }

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-serif text-2xl font-medium text-[#4a4035]">Popular</h2>
        <div className="flex items-center gap-3">
          <button className="rounded-full border border-[#d4c8b4] bg-transparent px-5 py-2 text-sm text-[#6b5d4d] transition-colors hover:bg-[#e8e0d0]">
            Mostrar todo
          </button>
          <div className="flex gap-1">
            <button
              className="flex size-9 items-center justify-center rounded-full border border-[#d4c8b4] bg-transparent text-[#6b5d4d] transition-colors hover:bg-[#e8e0d0]"
              onClick={() => scroll("left")}
              aria-label="Anterior"
            >
              <ChevronLeft className="size-4" />
            </button>
            <button
              className="flex size-9 items-center justify-center rounded-full border border-[#d4c8b4] bg-transparent text-[#6b5d4d] transition-colors hover:bg-[#e8e0d0]"
              onClick={() => scroll("right")}
              aria-label="Siguiente"
            >
              <ChevronRight className="size-4" />
            </button>
          </div>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="scrollbar-hide flex gap-6 overflow-x-auto pb-4"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {books.map((book) => (
          <BookCard
            key={book.id}
            title={book.name} 
            author={book.authors && book.authors.length > 0 ? book.authors.map(a => a.name).join(', ') : 'Autor desconocido'}
            coverUrl={book.coverUrl || undefined} 
            rating={4.5} 
          />
        ))}
      </div>
    </section>
  )
}