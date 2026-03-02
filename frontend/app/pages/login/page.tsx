import { LoginHero } from "@/components/login/login-hero"
import { LoginForm } from "@/components/login/login-form"

export default function LoginPage() {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-[52%_48%] font-dm-sans bg-landing-warm-white selection:bg-landing-red/20 overflow-x-hidden">
      <LoginHero />
      <LoginForm />
    </div>
  )
}
