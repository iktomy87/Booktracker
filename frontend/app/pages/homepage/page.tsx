import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { CategoriesSection } from "@/components/categories-section"
import { PopularBooksSection } from "@/components/popular-books-section"
import { fetchBooks } from "@/lib/api"; 
import AuthGuard from "@/components/authguard";

export default async function HomePage() {
  let books = [];
  try {
    books = await fetchBooks();
  } catch (error) {
    console.error("No se pudo conectar con el backend", error);
  }

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
              <PopularBooksSection books={books} />
            </div>
          </main>
        </div>
      </div>
    </AuthGuard>
  )
}
