import React from 'react';

interface StatCardProps {
  icon: string;
  number: number | string;
  label: string;
  variant: 'amber' | 'green' | 'dark';
}

const StatCard = ({ icon, number, label, variant }: StatCardProps) => {
  const variantClasses = {
    amber: 'bg-[#fdf0e0]',
    green: 'bg-[#edf3e8]',
    dark: 'bg-[#e8e0d4]',
  };

  return (
    <div className="flex items-center gap-4 rounded-2xl border border-landing-sand bg-landing-warm-white p-5">
      <div className={`flex h-11 w-11 items-center justify-center rounded-xl text-lg ${variantClasses[variant]}`}>
        {icon}
      </div>
      <div className="flex flex-col">
        <div className="font-playfair text-2xl font-semibold leading-none text-landing-dark">
          {number}
        </div>
        <div className="mt-1 text-[11px] font-medium tracking-widest text-landing-text-muted uppercase">
          {label}
        </div>
      </div>
    </div>
  );
};

export const LibraryStats = () => {
  return (
    <div className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 animate-fade-up">
      <StatCard icon="📖" number={3} label="Leyendo ahora" variant="amber" />
      <StatCard icon="✅" number={24} label="Terminados" variant="green" />
      <StatCard icon="📚" number={7} label="Por leer" variant="dark" />
      
      {/* Year Goal Card */}
      <div className="relative flex items-center gap-4 overflow-hidden rounded-2xl bg-landing-dark p-5">
        <div className="absolute -top-5 -right-5 h-[120px] w-[120px] pointer-events-none bg-[radial-gradient(circle,rgba(140,32,48,0.4)_0%,transparent_70%)]" />
        
        <div className="relative h-12 w-12 flex-shrink-0">
          <svg className="h-12 w-12 -rotate-90" viewBox="0 0 48 48">
            <circle 
              className="fill-none stroke-white/12 stroke-[4]" 
              cx="24" cy="24" r="20"
            />
            <circle 
              className="fill-none stroke-[#e8a0a8] stroke-[4] stroke-linecap-round transition-all duration-1000 ease-in-out" 
              cx="24" cy="24" r="20"
              strokeDasharray="125"
              strokeDashoffset="75"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center font-playfair text-xs font-semibold text-landing-warm-white">
            48%
          </div>
        </div>
        
        <div className="flex flex-col">
          <div className="font-playfair text-2xl font-semibold leading-none text-landing-warm-white">
            12 <span className="text-base opacity-60">/ 25</span>
          </div>
          <div className="mt-1 text-[11px] font-medium tracking-widest text-white/55 uppercase">
            Meta 2026
          </div>
        </div>
      </div>
    </div>
  );
};
