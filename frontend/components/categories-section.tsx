"use client"

import { useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const categories = [
  "Todo",
  "Nuevo",
  "Bestsellers",
  "Fantasía",
  "Novelas",
  "Poesía",
  "Clásicos",
  "Misterio",
  "Romance",
  "Ficción",
]

export function CategoriesSection() {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 200
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      })
    }
  }

  return (
    <section className="py-2">
      <div className="flex items-center justify-between">
        <h2 className="font-serif text-xl font-semibold text-foreground">Categorías</h2>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            className="size-8 rounded-full bg-transparent"
            onClick={() => scroll("left")}
            aria-label="Desplazar categorías a la izquierda"
          >
            <ChevronLeft className="size-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="size-8 rounded-full bg-transparent"
            onClick={() => scroll("right")}
            aria-label="Desplazar categorías a la derecha"
          >
            <ChevronRight className="size-4" />
          </Button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="scrollbar-hide flex gap-6 overflow-x-auto pb-2"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {categories.map((category) => (
          <button key={category} className="flex flex-col items-center gap-2">
            <div className="size-16 rounded-full bg-[#e0d6c8] transition-colors hover:bg-[#d4c8b4]" />
            <span className="whitespace-nowrap text-sm text-[#6b5d4d]">{category}</span>
          </button>
        ))}
      </div>
    </section>
  )
}
