'use client';
import { useState } from "react";
import Link from "next/link"
import Typewriter from 'typewriter-effect';

export function LandingHero() {
  const [isTypingDone, setIsTypingDone] = useState(false);
  return (
    <section className="min-h-screen pt-40 pb-24 px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-[1300px] mx-auto md:px-16 lg:px-20">
      <div className="flex flex-col">
        
        {/* El h1 necesita un min-h para que el texto de abajo no salte mientras se escribe */}
        <h1 className="font-playfair text-[clamp(3rem,5vw,5.5rem)] font-medium leading-[1.1] text-landing-dark mb-6 min-h-[4.5em]">
          <Typewriter
            onInit={(typewriter) => {
              typewriter
                .typeString('Cada libro<br />que has <em class="italic text-landing-red not-italic">leído</em>,<br />en un solo lugar.')
                // callFunction se ejecuta exactamente cuando typeString termina
                .callFunction(() => {
                  setIsTypingDone(true); 
                })
                .start();
            }}
            options={{
              delay: 50,
              cursor: '|',
              cursorClassName: 'text-landing-red font-light animate-pulse'
            }}
          />
        </h1>

        {/* Contenedor del párrafo y botones condicionado por isTypingDone */}
        <div 
          className={`transition-all duration-1000 ease-out ${
            isTypingDone 
              ? "opacity-100 translate-y-0" 
              : "opacity-0 translate-y-8 pointer-events-none"
          }`}
        >
          <p className="text-lg text-landing-text-muted leading-relaxed max-w-[420px] mb-10 font-light">
            Quill transforma tus lecturas en una bella biblioteca — sigue tu progreso, descubre nuevas historias, y construye hábitos que duren.
          </p>
          
          <div className="flex items-center gap-6">
            <Link href="#" className="bg-landing-dark text-landing-warm-white px-9 py-3.5 rounded-full font-medium text-sm transition-all hover:bg-landing-red hover:-translate-y-0.5">
              Crea una cuenta gratis
            </Link>
            <Link href="#" className="text-landing-text-muted text-sm flex items-center gap-1.5 transition-colors hover:text-landing-text">
              See how it works &rarr;
            </Link>
          </div>
        </div>

      </div>

      <div className="relative animate-fade-in [animation-delay:0.3s]">
        <div className="bg-landing-warm-white rounded-[20px] p-8 shadow-[0_24px_60px_rgba(42,31,20,0.12)] border border-landing-sand">
          <div className="text-[10px] uppercase tracking-[0.12em] text-landing-text-muted mb-5">
            Leyendo actualmente
          </div>
          <div className="flex gap-5 items-start">
            <div className="w-[72px] h-[100px] rounded-[4px] flex-shrink-0 flex items-center justify-center font-playfair text-[10px] text-center p-1.5 leading-tight font-semibold tracking-wide bg-[#2d4a1e] text-[#a8c87a] bg-[repeating-linear-gradient(45deg,transparent,transparent_2px,rgba(168,200,122,0.08)_2px,rgba(168,200,122,0.08)_4px)]">
              CIEN AÑOS<br />DE<br />SOLEDAD
            </div>
            <div className="flex-1">
              <h3 className="font-playfair text-base font-medium text-landing-dark mb-1">
                Cien Años de Soledad
              </h3>
              <div className="text-xs text-landing-red font-medium mb-4">
                Gabriel García Márquez
              </div>
              <div className="mt-2">
                <div className="flex justify-between text-[11px] text-landing-text-muted mb-1.5">
                  <span>Página 120 de 471</span>
                  <span>25%</span>
                </div>
                <div className="h-1.5 bg-landing-sand rounded-full overflow-hidden">
                  <div className="h-full bg-linear-to-r from-landing-red to-landing-red-light rounded-full w-[25%] animate-fill-bar origin-left"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full h-px bg-landing-sand my-8"></div>

          <div className="grid grid-cols-3 gap-3.5">
            <div className="bg-landing-cream rounded-xl p-4 text-center border border-landing-sand">
              <div className="font-playfair text-2xl font-semibold text-landing-dark leading-none">24</div>
              <div className="text-[10px] text-landing-text-muted mt-1 uppercase tracking-wider">Libros leídos</div>
            </div>
            <div className="bg-landing-cream rounded-xl p-4 text-center border border-landing-sand">
              <div className="font-playfair text-2xl font-semibold text-landing-dark leading-none">12</div>
              <div className="text-[10px] text-landing-text-muted mt-1 uppercase tracking-wider">Este año</div>
            </div>
            <div className="bg-landing-cream rounded-xl p-4 text-center border border-landing-sand">
              <div className="font-playfair text-2xl font-semibold text-landing-dark leading-none">🔥 18</div>
              <div className="text-[10px] text-landing-text-muted mt-1 uppercase tracking-wider">Racha diaria</div>
            </div>
          </div>
        </div>

        <div className="absolute -bottom-6 -left-8 bg-landing-dark text-landing-warm-white rounded-xl p-3.5 px-5 flex items-center gap-3 shadow-[0_8px_30px_rgba(42,31,20,0.25)] animate-float">
          <div className="text-xl">🏅</div>
          <div className="text-[11px]">
            <strong className="block text-[13px] font-playfair font-semibold">Nueva medalla desbloqueada</strong>
            Lee 10 libros este año
          </div>
        </div>
      </div>
    </section>
  )
}
