"use client"

import React, { useState, useEffect } from 'react';
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
import { fetchUserLibrary, updateUserBook } from '@/lib/api';

type TabType = 'reading' | 'finished' | 'wishlist' | 'timeline';

export default function LibraryPage() {
  const [activeTab, setActiveTab] = useState<TabType>('reading');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [library, setLibrary] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadLibrary = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const data = await fetchUserLibrary(token);
        setLibrary(data);
      }
    } catch (error) {
      console.error("Error loading library:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadLibrary();
  }, []);

  const handleUpdateProgress = async (userBookId: number) => {
    const newPage = prompt("¿En qué página estás?");
    if (newPage && !isNaN(parseInt(newPage))) {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          await updateUserBook(userBookId, { currentPage: parseInt(newPage) }, token);
          loadLibrary(); // Refresh
        }
      } catch (error) {
        console.error("Error updating progress:", error);
        alert("Error al actualizar el progreso");
      }
    }
  };

  const readingBooks = library.filter(item => item.status === 'reading');
  const finishedBooks = library.filter(item => item.status === 'finished');
  const wishlistBooks = library.filter(item => item.status === 'wishlist');

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
                Tu colección personal · {library.length} libros en total
              </p>
            </div>
            <div className="flex gap-3">
              <Link href='/pages/add-book' className="flex items-center gap-1.5 rounded-full bg-landing-dark px-5 py-2.5 font-dm-sans text-[13.5px] font-medium text-landing-warm-white transition-all hover:bg-landing-red hover:-translate-y-px">
                <Plus className="size-3.5" />
                Añadir libro
              </Link>
            </div>
          </div>

          <LibraryStats 
            reading={readingBooks.length} 
            finished={finishedBooks.length} 
            wishlist={wishlistBooks.length} 
          />

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
              )}>{readingBooks.length}</span>
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
              )}>{finishedBooks.length}</span>
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
              )}>{wishlistBooks.length}</span>
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
            {isLoading ? (
              <div className="flex items-center justify-center py-20 text-landing-text-muted">Cargando biblioteca...</div>
            ) : (
              <>
                {activeTab === 'reading' && (
                  <div className="animate-fade-up">
                    <div className="mb-4 flex items-center gap-2 text-[11px] font-semibold tracking-widest text-landing-red uppercase">
                      En progreso
                      <div className="h-px flex-1 bg-landing-sand" />
                    </div>
                    {readingBooks.length > 0 ? (
                      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                        {readingBooks.map(item => (
                          <ReadingCard 
                            key={item.id}
                            id={item.id}
                            title={item.book.title}
                            author={item.book.author}
                            currentPage={item.currentPage}
                            totalPages={item.book.pages}
                            coverVariant={item.book.cv}
                            onUpdateProgress={handleUpdateProgress}
                          />
                        ))}
                      </div>
                    ) : (
                      <div className="py-20 text-center text-landing-text-muted">No tienes libros en progreso actualmente.</div>
                    )}
                  </div>
                )}

                {activeTab === 'finished' && (
                  <div className="animate-fade-up">
                    <div className="mb-4 flex items-center gap-2 text-[11px] font-semibold tracking-widest text-landing-red uppercase">
                      Completados
                      <div className="h-px flex-1 bg-landing-sand" />
                    </div>
                    {finishedBooks.length > 0 ? (
                      <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                        {finishedBooks.map(item => (
                          <FinishedCard 
                            key={item.id}
                            title={item.book.title}
                            author={item.book.author}
                            date={`Terminado ${item.endDate || ''}`}
                            rating={item.rating}
                            coverVariant={item.book.cv} 
                          />
                        ))}
                      </div>
                    ) : (
                      <div className="py-20 text-center text-landing-text-muted">Aún no has terminado ningún libro. ¡Ánimo!</div>
                    )}
                  </div>
                )}

                {activeTab === 'wishlist' && (
                  <div className="animate-fade-up">
                    <div className="mb-4 flex items-center gap-2 text-[11px] font-semibold tracking-widest text-landing-red uppercase">
                      Lista de deseos
                      <div className="h-px flex-1 bg-landing-sand" />
                    </div>
                    {wishlistBooks.length > 0 ? (
                      <div className="flex flex-col gap-3">
                        {wishlistBooks.map((item, index) => (
                          <WishlistItem 
                            key={item.id}
                            rank={(index + 1).toString().padStart(2, '0')}
                            title={item.book.title}
                            author={item.book.author}
                            tags={item.tags || []}
                            addedDate={`Añadido ${item.startDate || ''}`}
                            coverVariant={item.book.cv} 
                          />
                        ))}
                      </div>
                    ) : (
                      <div className="py-20 text-center text-landing-text-muted">Tu lista de deseos está vacía.</div>
                    )}
                  </div>
                )}

                {activeTab === 'timeline' && (
                  <div className="animate-fade-up">
                    <TimelineSection />
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
