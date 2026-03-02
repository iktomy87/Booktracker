export function LandingCTA() {
  return (
    <section className="py-36 px-8 max-w-[1300px] mx-auto text-center md:px-16 lg:px-20">
      <div className="text-[11px] uppercase tracking-[0.15em] text-landing-red font-medium mb-4">
        Empieza hoy
      </div>
      <h2 className="font-playfair text-[clamp(2.5rem,4vw,4rem)] font-medium text-landing-dark leading-[1.15] mb-5">
        Tu siguiente capítulo<br /><em className="italic text-landing-red not-italic">comienza aquí.</em>
      </h2>
      <p className="text-base text-landing-text-muted max-w-[420px] mx-auto leading-relaxed mb-10 font-light">
        Únete a miles de lectores y haz que cada libro cuente. Comienza gratis ahora, siempre
      </p>
      <div className="flex max-w-[420px] mx-auto border border-landing-tan rounded-full bg-landing-warm-white overflow-hidden shadow-[0_4px_20px_rgba(42,31,20,0.07)]">
        <input
          type="email"
          placeholder="Enter your email address"
          className="flex-1 px-6 py-3.5 bg-transparent text-[13px] text-landing-text outline-none placeholder:text-landing-text-muted"
        />
        <button className="bg-landing-dark text-landing-warm-white px-7 py-3 rounded-full font-medium text-[12px] m-1 transition-colors hover:bg-landing-red cursor-pointer">
          Get early access
        </button>
      </div>
    </section>
  )
}
