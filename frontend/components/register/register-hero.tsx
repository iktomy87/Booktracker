import Link from "next/link"
import Image from "next/image"

export function RegisterHero() {
  const genres = ["Ficción", "Clásicos", "Misterio", "Poesía", "Fantasía"]

  return (
    <div className="bg-landing-cream relative flex flex-col items-center justify-center overflow-hidden p-12 before:content-[''] before:absolute before:inset-0 before:bg-[url('data:image/svg+xml,%3Csvg_viewBox=%270_0_512_512%27_xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter_id=%27noise%27%3E%3CfeTurbulence_type=%27fractalNoise%27_baseFrequency=%270.75%27_numOctaves=%274%27_stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect_width=%27100%25%27_height=%27100%25%27_filter=%27url(%23noise)%27_opacity=%270.04%27/%3E%3C/svg%3E')] before:pointer-events-none before:z-1 after:content-[''] after:absolute after:w-[600px] after:h-[600px] after:bg-[radial-gradient(circle,rgba(125,31,46,0.08)_0%,transparent_70%)] after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:pointer-events-none">
      
      {/* Top logo */}
      <div className="absolute top-6 left-12 flex items-center gap-2">
        <Link href="/" className="font-playfair text-[0.85rem] font-bold text-landing-dark tracking-wide z-2">Quill</Link>
      </div>

      {/* Floating quote card */}
      <div className="absolute top-8 right-10 bg-white/55 backdrop-blur-xl border border-white/70 rounded-[14px] p-4 max-w-[200px] z-2 animate-float">
        <p className="font-playfair text-[0.75rem] italic text-landing-dark leading-relaxed mb-1.5">
          &quot;Un lector vive mil vidas antes de morir.&quot;
        </p>
        <span className="text-[0.65rem] text-landing-text-muted tracking-wide">
          — George R.R. Martin
        </span>
      </div>

      {/* Center hero */}
      <div className="relative z-2 text-center flex flex-col items-center gap-7 animate-fade-up">
        {/* Logo with orbit ring */}
        <div className="relative w-40 h-40 flex items-center justify-center">
          <Image
            src="/gafas.png" 
            alt="Quill Logo"
            fill 
            className="object-contain" 
             priority 
          />
        </div>

        <div className="flex items-center gap-3 opacity-40">
          <div className="w-[50px] h-px bg-landing-dark"></div>
          <div className="w-1.5 h-1.5 bg-landing-red rotate-45"></div>
          <div className="w-[50px] h-px bg-landing-dark"></div>
        </div>

        <div className="hero-text-block">
          <h1 className="font-playfair text-[2.6rem] font-medium text-landing-dark leading-tight">
            Tu siguiente capítulo
            <em className="italic text-landing-red not-italic block">comienza aquí</em>
          </h1>
          <p className="text-[0.88rem] text-landing-text-muted mt-2.5 font-light tracking-wide">
            Más de 50,000 lectores ya llevan su vida lectora en Folio
          </p>
        </div>

        {/* Mini genre tags */}
        <div className="flex gap-2 flex-wrap justify-center mt-1">
          {genres.map((genre) => (
            <span key={genre} className="px-3 py-1 border border-landing-dark/20 rounded-full text-[0.65rem] text-landing-text-muted tracking-wide bg-white/50 backdrop-blur-md">
              {genre}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom stats pill - Simplified according to requirements */}
      <div className="absolute bottom-14 right-8 bg-landing-dark text-landing-warm-white rounded-full px-5 py-2.5 flex items-center gap-4 text-[0.75rem] z-2 animate-float [animation-delay:1s]">
        <div className="flex flex-col items-center gap-0.5">
          <strong className="font-playfair text-base leading-none">50k</strong>
          <span className="text-[0.6rem] opacity-60 uppercase tracking-widest">Lectores</span>
        </div>
        <div className="w-px h-4 bg-white/25"></div>
        <div className="flex flex-col items-center gap-0.5">
          <strong className="font-playfair text-base leading-none">4.9 ★</strong>
          <span className="text-[0.6rem] opacity-60 uppercase tracking-widest">Rating</span>
        </div>
      </div>
    </div>
  )
}
