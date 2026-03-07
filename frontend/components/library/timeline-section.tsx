import React from 'react';

const months = [
  { name: 'Ene', count: 2, height: 40 },
  { name: 'Feb', count: 1, height: 20 },
  { name: 'Mar', count: 2, height: 40 },
  { name: 'Abr', count: 1, height: 20 },
  { name: 'May', count: 3, height: 60 },
  { name: 'Jun', count: 2, height: 40 },
  { name: 'Jul', count: 1, height: 20 },
  { name: 'Ago', count: null, height: 4, future: true },
  { name: 'Sep', count: null, height: 4, future: true },
  { name: 'Oct', count: null, height: 4, future: true },
  { name: 'Nov', count: null, height: 4, future: true },
  { name: 'Dic', count: null, height: 4, future: true },
];

export const TimelineSection = () => {
  return (
    <div className="rounded-[20px] border border-landing-sand bg-landing-warm-white p-8 animate-fade-up">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="font-playfair text-[18px] font-medium text-landing-dark">
            Libros leídos por mes
          </h3>
          <p className="mt-1 text-[12px] text-landing-text-muted">
            12 libros completados en 2026 · mejor racha: 3 en mayo
          </p>
        </div>
        <div className="flex cursor-pointer items-center gap-1.5 text-[13px] text-landing-text-muted">
          2026 ▾
        </div>
      </div>

      <div className="grid grid-cols-6 gap-2 sm:grid-cols-12 sm:gap-4">
        {months.map((month) => (
          <div key={month.name} className="flex flex-col items-center gap-1.5">
            <div className="flex h-20 w-full flex-col-reverse items-center">
              <div 
                className={`group relative w-full rounded-t-sm transition-all duration-700 ease-in-out ${
                  month.future ? 'bg-landing-sand' : 'bg-gradient-to-t from-landing-red to-landing-red-light'
                }`}
                style={{ height: `${month.height}px` }}
              >
                {!month.future && (
                  <div className="invisible absolute bottom-full left-1/2 mb-1.5 -translate-x-1/2 whitespace-nowrap rounded-[5px] bg-landing-dark px-2 py-1 text-[10.5px] text-landing-warm-white group-hover:visible">
                    {month.name} · {month.count} {month.count === 1 ? 'libro' : 'libros'}
                  </div>
                )}
              </div>
            </div>
            <div className={`text-[10px] font-medium tracking-widest uppercase ${month.future ? 'text-landing-sand' : 'text-landing-text-muted'}`}>
              {month.name}
            </div>
            <div className={`text-[10.5px] font-medium ${month.future ? 'text-landing-sand' : 'text-landing-text-muted'}`}>
              {month.count ?? '—'}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
