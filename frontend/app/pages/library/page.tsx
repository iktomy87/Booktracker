"use client"

import React, { useState } from 'react';
import { Sidebar } from '@/components/sidebar';
import { Header } from '@/components/header';
import { LibraryStats } from '@/components/library/library-stats';
import { ReadingCard } from '@/components/library/reading-card';
import { FinishedCard } from '@/components/library/finished-card';
import { WishlistItem } from '@/components/library/wishlist-item';
import { TimelineSection } from '@/components/library/timeline-section';
import { cn } from '@/lib/utils';
import { Filter, Grid, List, Plus, Download } from 'lucide-react';
import Link from 'next/link';

type TabType = 'reading' | 'finished' | 'wishlist' | 'timeline';

export default function LibraryPage() {
  const [activeTab, setActiveTab] = useState<TabType>('reading');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  return (
    <div className="flex min-h-screen bg-landing-cream text-landing-text">
      <Sidebar />
      
      <main className="flex-1 lg:ml-24">
        <Header />
        
        <div className="mx-auto max-w-[1260px] px-6 py-10 md:px-10 lg:py-12">
          
          {/* Page Header */}
          <div className="mb-8 flex flex-col items-start justify-between gap-4 animate-fade-up sm:flex-row sm:items-end">
            <div>
              <h1 className="font-playfair text-[35px] font-medium leading-[1.1] text-landing-dark md:text-[42px]">
                Mi Biblioteca
              </h1>
              <p className="mt-1 text-[13.5px] font-light text-landing-text-muted">
                Tu colección personal · 34 libros en total
              </p>
            </div>
            <div className="flex gap-3">
              <Link href='/pages/add-book' className="flex items-center gap-1.5 rounded-full bg-landing-dark px-5 py-2.5 font-dm-sans text-[13.5px] font-medium text-landing-warm-white transition-all hover:bg-landing-red hover:-translate-y-px">
                <Plus className="size-3.5" />
                Añadir libro
              </Link>
            </div>
          </div>

          <LibraryStats />

          {/* Tabs */}
          <div className="mb-7 flex flex-wrap items-center gap-1.5 border-b border-landing-sand animate-fade-up">
            <button 
              onClick={() => setActiveTab('reading')}
              className={cn(
                "flex items-center gap-2 px-5 py-3 text-[13.5px] font-normal transition-all border-b-2",
                activeTab === 'reading' 
                  ? "border-landing-dark text-landing-dark font-medium" 
                  : "border-transparent text-landing-text-muted hover:text-landing-text"
              )}
            >
              Leyendo <span className={cn(
                "rounded-full px-1.5 py-0.5 text-[10.5px] font-semibold",
                activeTab === 'reading' ? "bg-landing-dark text-landing-warm-white" : "bg-landing-sand text-landing-text-muted"
              )}>3</span>
            </button>
            <button 
              onClick={() => setActiveTab('finished')}
              className={cn(
                "flex items-center gap-2 px-5 py-3 text-[13.5px] font-normal transition-all border-b-2",
                activeTab === 'finished' 
                  ? "border-landing-dark text-landing-dark font-medium" 
                  : "border-transparent text-landing-text-muted hover:text-landing-text"
              )}
            >
              Terminados <span className={cn(
                "rounded-full px-1.5 py-0.5 text-[10.5px] font-semibold",
                activeTab === 'finished' ? "bg-landing-dark text-landing-warm-white" : "bg-landing-sand text-landing-text-muted"
              )}>24</span>
            </button>
            <button 
              onClick={() => setActiveTab('wishlist')}
              className={cn(
                "flex items-center gap-2 px-5 py-3 text-[13.5px] font-normal transition-all border-b-2",
                activeTab === 'wishlist' 
                  ? "border-landing-dark text-landing-dark font-medium" 
                  : "border-transparent text-landing-text-muted hover:text-landing-text"
              )}
            >
              Por leer <span className={cn(
                "rounded-full px-1.5 py-0.5 text-[10.5px] font-semibold",
                activeTab === 'wishlist' ? "bg-landing-dark text-landing-warm-white" : "bg-landing-sand text-landing-text-muted"
              )}>7</span>
            </button>
            <button 
              onClick={() => setActiveTab('timeline')}
              className={cn(
                "flex items-center gap-2 px-5 py-3 text-[13.5px] font-normal transition-all border-b-2",
                activeTab === 'timeline' 
                  ? "border-landing-dark text-landing-dark font-medium" 
                  : "border-transparent text-landing-text-muted hover:text-landing-text"
              )}
            >
              Historial anual
            </button>

            <div className="flex-1" />

            <div className="hidden items-center gap-1 lg:flex">
              <button 
                onClick={() => setViewMode('grid')}
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-lg border transition-all",
                  viewMode === 'grid' ? "bg-landing-warm-white border-landing-sand text-landing-dark" : "bg-transparent border-transparent text-landing-text-muted hover:bg-landing-sand"
                )}
              >
                <Grid className="size-3.5" />
              </button>
              <button 
                onClick={() => setViewMode('list')}
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-lg border transition-all",
                  viewMode === 'list' ? "bg-landing-warm-white border-landing-sand text-landing-dark" : "bg-transparent border-transparent text-landing-text-muted hover:bg-landing-sand"
                )}
              >
                <List className="size-3.5" />
              </button>
            </div>
            
            <button className="flex items-center gap-1.5 rounded-lg border border-landing-sand bg-transparent px-3.5 py-1.5 font-dm-sans text-[12.5px] text-landing-text-muted transition-all hover:border-landing-tan hover:text-landing-text sm:ml-2">
              <Filter className="size-3.5" />
              Filtrar
            </button>
          </div>

          {/* Tab Content */}
          <div className="min-h-[400px]">
            {activeTab === 'reading' && (
              <div className="animate-fade-up">
                <div className="mb-4 flex items-center gap-2 text-[11px] font-semibold tracking-widest text-landing-red uppercase">
                  En progreso
                  <div className="h-px flex-1 bg-landing-sand" />
                </div>
                <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                  <ReadingCard 
                    title="Cien Años de Soledad"
                    author="Gabriel García Márquez"
                    currentPage={120}
                    totalPages={471}
                    streak="18 días seguidos"
                    coverVariant="cv1"
                  />
                  <ReadingCard 
                    title="El Señor de los Anillos"
                    author="J.R.R. Tolkien"
                    currentPage={347}
                    totalPages={1216}
                    streak="5 días seguidos"
                    coverVariant="cv5"
                  />
                  <ReadingCard 
                    title="Asesinato en el Orient Express"
                    author="Agatha Christie"
                    currentPage={88}
                    totalPages={256}
                    lastRead="Última lectura hace 12 días"
                    isPaused={true}
                    coverVariant="cv3"
                  />
                </div>
              </div>
            )}

            {activeTab === 'finished' && (
              <div className="animate-fade-up">
                <div className="mb-4 flex items-center gap-2 text-[11px] font-semibold tracking-widest text-landing-red uppercase">
                  Completados este año · 12 libros
                  <div className="h-px flex-1 bg-landing-sand" />
                </div>
                <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                  <FinishedCard title="The Great Gatsby" author="F. Scott Fitzgerald" date="Terminado ene. 2026" rating={5.0} coverVariant="cv2" />
                  <FinishedCard title="Crimen y Castigo" author="Fiódor Dostoievski" date="Terminado dic. 2025" rating={4.5} coverVariant="cv4" />
                  <FinishedCard title="Pedro Páramo" author="Juan Rulfo" date="Terminado nov. 2025" rating={4.0} coverVariant="cv6" />
                  <FinishedCard title="Jane Eyre" author="Charlotte Brontë" date="Terminado oct. 2025" rating={5.0} coverVariant="cv8" />
                  <FinishedCard title="Estudio en Escarlata" author="Arthur Conan Doyle" date="Terminado sep. 2025" rating={4.5} coverVariant="cv7" />
                  <FinishedCard title="1984" author="George Orwell" date="Terminado ago. 2025" rating={5.0} coverVariant="cv9" />
                  <FinishedCard title="Don Quijote" author="Cervantes" date="Terminado jul. 2025" rating={4.0} coverVariant="cv10" />
                  <FinishedCard title="Los Miserables" author="Victor Hugo" date="Terminado jun. 2025" rating={4.5} coverVariant="cv1" />
                </div>
              </div>
            )}

            {activeTab === 'wishlist' && (
              <div className="animate-fade-up">
                <div className="mb-4 flex items-center gap-2 text-[11px] font-semibold tracking-widest text-landing-red uppercase">
                  Lista de deseos · 7 títulos
                  <div className="h-px flex-1 bg-landing-sand" />
                </div>
                <div className="flex flex-col gap-3">
                  <WishlistItem rank="01" title="Ulises" author="James Joyce" tags={['Clásico', 'Modernismo', 'Irlandés']} addedDate="Añadido hace 3 días" coverVariant="cv6" />
                  <WishlistItem rank="02" title="En Busca del Tiempo Perdido" author="Marcel Proust" tags={['Clásico', 'Francés', 'Extenso']} addedDate="Añadido hace 1 semana" coverVariant="cv8" />
                  <WishlistItem rank="03" title="El Nombre de la Rosa" author="Umberto Eco" tags={['Histórico', 'Misterio']} addedDate="Añadido hace 2 semanas" coverVariant="cv2" />
                  <WishlistItem rank="04" title="Ficciones" author="Jorge Luis Borges" tags={['Cuentos', 'Fantástico', 'Latinoam.']} addedDate="Añadido hace 1 mes" coverVariant="cv4" />
                </div>
              </div>
            )}

            {activeTab === 'timeline' && (
              <div className="animate-fade-up">
                <TimelineSection />
                <div className="mt-10">
                  <div className="mb-4 flex items-center gap-2 text-[11px] font-semibold tracking-widest text-landing-red uppercase">
                    Todos los terminados · 2026
                    <div className="h-px flex-1 bg-landing-sand" />
                  </div>
                  <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                    <FinishedCard title="The Great Gatsby" author="F. Scott Fitzgerald" date="Ene 2026" rating={5.0} coverVariant="cv2" />
                    <FinishedCard title="Cien Años de Soledad" author="García Márquez" date="Ene 2026" rating={5.0} coverVariant="cv1" />
                    <FinishedCard title="Pedro Páramo" author="Juan Rulfo" date="Feb 2026" rating={4.5} coverVariant="cv6" />
                    <FinishedCard title="Crimen y Castigo" author="Dostoievski" date="Mar 2026" rating={4.0} coverVariant="cv4" />
                    <FinishedCard title="1984" author="George Orwell" date="Mar 2026" rating={5.0} coverVariant="cv9" />
                  </div>
                </div>
              </div>
            )}
          </div>

        </div>
      </main>
    </div>
  );
}
