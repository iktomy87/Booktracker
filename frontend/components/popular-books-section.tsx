"use client"

import { useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { BookCard } from "@/components/book-card"

const popularBooks = [
  {
    id: 1,
    title: "Cien Años de Soledad",
    author: "Gabriel García Márquez",
    cover: "/placeholder.svg?height=320&width=200",
  },
  {
    id: 2,
    title: "El Gran Gatsby",
    author: "F. Scott Fitzgerald",
    cover: "/placeholder.svg?height=320&width=200",
  },
  {
    id: 3,
    title: "Asesinato en el Orient Express",
    author: "Agatha Christie",
    cover: "/placeholder.svg?height=320&width=200",
  },
  {
    id: 4,
    title: "Estudio en Escarlata",
    author: "Arthur Conan Doyle",
    cover: "/placeholder.svg?height=320&width=200",
  },
  {
    id: 5,
    title: "El Señor de los Anillos: La Comunidad del Anillo",
    author: "J.R.R. Tolkien",
    cover: "/placeholder.svg?height=320&width=200",
  },
]

export function PopularBooksSection() {
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
        {popularBooks.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </section>
  )
}
