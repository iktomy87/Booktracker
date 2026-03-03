"use client"; // Obligatorio al usar useState y useEffect

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export function LoginHero() {
  const frases = [
    {quote: "La lectura es un ticket de descuento a todas partes.", author: "Mary Schmich"},
    {quote: "No dejes para mañana los libros que puedes leer hoy.", author: "Holbrook Jackson"},
    {quote: "Leer es soñar de la mano de otro.", author: "Alice Casado"},
    {quote: "Aquel que tiene un porqué, puede soportar casi cualquier cómo", author: "Friedrich Nietzsche"},
  ];

  // Estado para guardar la frase seleccionada al azar
  const [fraseActiva, setFraseActiva] = useState({ quote: "", author: "" });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Seleccionamos un índice al azar entre 0 y el total de frases
    const indiceAleatorio = Math.floor(Math.random() * frases.length);
    setFraseActiva(frases[indiceAleatorio]);
    setIsLoaded(true); // Avisamos que ya tenemos la frase
  }, []);

  return (
    <div className="bg-landing-cream relative flex flex-col items-center justify-center overflow-hidden p-12 before:content-[''] before:absolute before:inset-0 before:bg-[url('data:image/svg+xml,%3Csvg_viewBox=%270_0_512_512%27_xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter_id=%27noise%27%3E%3CfeTurbulence_type=%27fractalNoise%27_baseFrequency=%270.75%27_numOctaves=%274%27_stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect_width=%27100%25%27_height=%27100%25%27_filter=%27url(%23noise)%27_opacity=%270.04%27/%3E%3C/svg%3E')] before:pointer-events-none">
      <div className="absolute top-6 left-12 flex items-center gap-2">
        <Link href="/" className="font-playfair text-[0.85rem] font-bold text-landing-dark tracking-wide z-2">Quill</Link>
      </div>
      {/* Contenido decorativo superior... */}
      <div className="absolute top-50 left-12 opacity-80 z-2">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-1.5 h-1.5 bg-landing-red rotate-45"></div>
          <div className="w-[50px] h-px bg-landing-dark"></div>
        </div>

        <div className="hero-text-block">
          {/* Mostramos la frase solo si ya se cargó para evitar saltos o errores */}
          <div className={`transition-opacity duration-500 min-h-[140px] ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
            <h1 className="font-playfair text-[2.6rem] font-medium text-landing-dark leading-tight">
              "{fraseActiva.quote}"
            </h1>
            {/* Agregamos el autor con un estilo sutil */}
            <p className="text-lg text-landing-red mt-3 font-medium italic">
              — {fraseActiva.author}
            </p>
          </div>

          <p className="text-[0.88rem] text-landing-text-muted mt-2.5 font-light tracking-wide">
            Más de 50,000 lectores ya llevan su vida lectora en Quill
          </p>
        </div>
      </div>

    </div>
  );
}