import Link from "next/link"

export function LandingLibrary() {
  const categories = ["Todo", "Ficción", "Clásicos", "Misterio", "Poesía", "Bestsellers", "Fantasía", "Romance"]
  
  const books = [
    { title: "Cien Años de Soledad", author: "García Márquez", color: "bg-linear-to-br from-[#1a2f0e] to-[#2d4a1e]", textColor: "text-[#a8c87a]", mini: "CIEN AÑOS DE SOLEDAD" },
    { title: "The Great Gatsby", author: "F. Scott Fitzgerald", color: "bg-linear-to-br from-[#0d1a2e] to-[#1a2f50]", textColor: "text-[#7ab8c8]", mini: "THE GREAT GATSBY" },
    { title: "Murder on the Orient Express", author: "Agatha Christie", color: "bg-linear-to-br from-[#2e0d0d] to-[#5a1a1a]", textColor: "text-[#f4b8b8]", mini: "MURDER ON THE ORIENT EXPRESS" },
    { title: "Sherlock Holmes", author: "Arthur Conan Doyle", color: "bg-linear-to-br from-[#2e2010] to-[#5a3a18]", textColor: "text-[#f4d8a8]", mini: "SHERLOCK HOLMES" },
    { title: "The Lord of the Rings", author: "J.R.R. Tolkien", color: "bg-linear-to-br from-[#1a1a2e] to-[#2e2d5a]", textColor: "text-[#b8a8f4]", mini: "THE LORD OF THE RINGS" },
]

  return (
    <section className="bg-landing-warm-white border-y border-landing-sand py-28 px-8 md:px-16 lg:px-20">
      <div className="max-w-[1300px] mx-auto">
        <div className="flex justify-between items-end mb-12">
          <div>
            <div className="text-[11px] uppercase tracking-[0.15em] text-landing-red font-medium mb-4">
              Tu biblioteca
            </div>
            <h2 className="font-playfair text-[clamp(2rem,3.5vw,2.5rem)] font-medium text-landing-dark leading-tight">
              Explora y organiza tu colección.
            </h2>
          </div>
          <Link href="#" className="text-landing-red text-sm font-medium transition-colors hover:text-landing-red-light">
            Mostrar todo &rarr;
          </Link>
        </div>

        <div className="flex gap-3 flex-wrap mb-10">
          {categories.map((cat, idx) => (
            <button
              key={idx}
              className={`px-4 py-1.5 border border-landing-sand rounded-full text-[13px] transition-all cursor-pointer ${
                idx === 0 ? "bg-landing-dark text-landing-warm-white border-landing-dark" : "bg-landing-warm-white text-landing-text-muted hover:bg-landing-dark hover:text-landing-warm-white hover:border-landing-dark"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="mt-10 overflow-x-auto scrollbar-hide">
          <div className="flex gap-6 min-w-max pb-4">
            {books.map((book, idx) => (
              <div key={idx} className="w-[120px]">
                <div className={`${book.color} w-[120px] h-[170px] rounded-lg mb-3 flex items-center justify-center p-4 transition-all hover:-translate-y-1.5 hover:scale-105 cursor-pointer`}>
                  <span className={`${book.textColor} font-playfair text-[9px] text-center font-bold tracking-widest whitespace-pre-line uppercase`}>
                    {book.mini}
                  </span>
                </div>
                <div className="text-[12px] font-medium text-landing-dark leading-snug mb-0.5 line-clamp-2">
                  {book.title}
                </div>
                <div className="text-[11px] text-landing-red font-medium">
                  {book.author}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
