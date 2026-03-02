import Link from "next/link"
import Image from 'next/image';

export function LandingNavbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-100 flex items-center justify-between px-8 py-5 bg-landing-cream/85 backdrop-blur-xl border-b border-landing-sand md:px-16">
      <Link href="/" className="flex items-center gap-2.5 no-underline">
        <div className="relative h-8 md:h-10 w-10">
            <Image
              src="/gafas.png" 
              alt="Quill Logo"
              fill 
              className="object-contain" 
              priority 
            />
          </div>
        <span className="font-playfair text-xl font-bold text-landing-dark tracking-tight">Quill</span>
      </Link>
      <ul className="hidden md:flex items-center gap-10 list-none">
        <li>
          <Link href="/pages/login" className="no-underline text-landing-text-muted text-sm tracking-wide transition-colors hover:text-landing-text">
            Iniciar Sesión
          </Link>
        </li>
        <li>
          <Link href="/pages/register" className="bg-landing-dark text-landing-warm-white px-5.5 py-2.5 rounded-full font-medium text-sm transition-colors hover:bg-landing-red hover:text-white">
            Registro
          </Link>
        </li>
      </ul>
      <button className="md:hidden text-landing-dark">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
      </button>
    </nav>
  )
}
