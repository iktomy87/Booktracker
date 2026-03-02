import { LandingNavbar } from "@/components/landing/landing-navbar"
import { LandingHero } from "@/components/landing/landing-hero"
import { LandingFeatures } from "@/components/landing/landing-features"
import { LandingLibrary } from "@/components/landing/landing-library"
import { LandingCTA } from "@/components/landing/landing-cta"
import { LandingFooter } from "@/components/landing/landing-footer"

export default function LandingPage() {
  return (
    <div className="bg-landing-cream min-h-screen text-landing-text font-dm-sans overflow-x-hidden">
      <LandingNavbar />
      <main>
        <LandingHero />
        <LandingFeatures />
        <LandingLibrary />
        <LandingCTA />
      </main>
      <LandingFooter />
    </div>
  )
}
