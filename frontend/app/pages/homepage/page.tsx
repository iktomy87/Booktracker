"use client"

import { useEffect, useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { CategoriesSection } from "@/components/categories-section"
import { PopularBooksSection } from "@/components/popular-books-section"
import { fetchBooks } from "@/lib/api"
import AuthGuard from "@/components/authguard" 

export default function HomePage() {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadBooks = async () => {
      try {
        const token = localStorage.getItem("token");
        
        if (token) {
          // Si hay token, pedimos los libros autorizados al backend
          const fetchedBooks = await fetchBooks(token);
          setBooks(fetchedBooks);
        }
      } catch (error) {
        console.error("No se pudo conectar con el backend:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadBooks();
  }, []);

  return (
    <AuthGuard>
      <div className="flex min-h-screen bg-[#f0ebe3]">
        <Sidebar />
        <div className="flex flex-1 flex-col">
          <Header />
          <main className="flex-1 overflow-auto px-8 py-4 lg:px-12">
            <div className="mx-auto max-w-5xl space-y-8">
              <HeroSection />
              <CategoriesSection />
              
              {/* Mostramos un mensaje de carga o la sección de libros */}
              {isLoading ? (
                <div className="py-8 text-center text-landing-text-muted font-dm-sans animate-pulse">
                  Cargando tu biblioteca...
                </div>
              ) : (
                <PopularBooksSection books={books} />
              )}
              
            </div>
          </main>
        </div>
      </div>
    </AuthGuard>
  )
}