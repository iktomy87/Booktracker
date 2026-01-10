interface Book {
  id: number
  title: string
  author: string
  cover: string
}

interface BookCardProps {
  book: Book
}

export function BookCard({ book }: BookCardProps) {
  return (
    <div className="group w-[180px] flex-shrink-0 cursor-pointer">
      <div className="overflow-hidden rounded-lg">
        <img
          src={book.cover || "/placeholder.svg"}
          alt={`Portada de ${book.title}`}
          className="h-[260px] w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="mt-3 space-y-1">
        <h3 className="line-clamp-2 text-sm font-medium text-[#4a4035]">{book.title}</h3>
        <p className="text-sm text-[#9b4a4a]">{book.author}</p>
      </div>
    </div>
  )
}
