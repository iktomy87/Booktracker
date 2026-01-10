import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { CategoriesSection } from "@/components/categories-section"
import { PopularBooksSection } from "@/components/popular-books-section"

export default function HomePage() {
  return (
    <div className="flex min-h-screen bg-[#f0ebe3]">
      <Sidebar />
      <div className="flex flex-1 flex-col">
        <Header />
        <main className="flex-1 overflow-auto px-8 py-4 lg:px-12">
          <div className="mx-auto max-w-5xl space-y-8">
            <HeroSection />
            <CategoriesSection />
            <PopularBooksSection />
          </div>
        </main>
      </div>
    </div>
  )
}
