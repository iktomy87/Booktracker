import React from 'react';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

export type Step = 1 | 2 | 3;

interface StepIndicatorProps {
  currentStep: Step;
  isManual?: boolean;
}

export const StepIndicator = ({ currentStep, isManual }: StepIndicatorProps) => {
  if (currentStep === 3) return null;

  return (
    <div className="mb-10 flex items-center animate-fade-up">
      <div className="flex items-center gap-2.5">
        <div className={cn(
          "flex h-[30px] w-[30px] items-center justify-center rounded-full text-[11px] font-semibold transition-all",
          currentStep > 1 ? "bg-landing-red text-white" : "bg-landing-dark text-landing-warm-white"
        )}>
          {currentStep > 1 ? <Check className="size-3.5" /> : "1"}
        </div>
        <span className={cn(
          "text-[12.5px] font-medium transition-colors",
          currentStep > 1 ? "text-landing-red" : "text-landing-dark"
        )}>
          {isManual ? "Crear libro" : "Buscar libro"}
        </span>
      </div>
      <div className={cn("mx-3 h-px w-12", currentStep > 1 ? "bg-landing-red" : "bg-landing-sand")} />
      
      <div className="flex items-center gap-2.5">
        <div className={cn(
          "flex h-[30px] w-[30px] items-center justify-center rounded-full text-[11px] font-semibold transition-all",
          currentStep === 2 ? "bg-landing-dark text-landing-warm-white" : currentStep > 2 ? "bg-landing-red text-white" : "bg-landing-sand text-landing-text-muted"
        )}>
          {currentStep > 2 ? <Check className="size-3.5" /> : "2"}
        </div>
        <span className={cn(
          "text-[12.5px] font-medium transition-colors",
          currentStep === 2 ? "text-landing-dark" : currentStep > 2 ? "text-landing-red" : "text-landing-text-muted"
        )}>
          Estado & detalles
        </span>
      </div>
      <div className={cn("mx-3 h-px w-12", currentStep > 2 ? "bg-landing-red" : "bg-landing-sand")} />
      
      <div className="flex items-center gap-2.5">
        <div className={cn(
          "flex h-[30px] w-[30px] items-center justify-center rounded-full text-[11px] font-semibold transition-all",
          currentStep === 3 ? "bg-landing-dark text-landing-warm-white" : "bg-landing-sand text-landing-text-muted"
        )}>
          3
        </div>
        <span className={cn(
          "text-[12.5px] font-medium transition-colors",
          currentStep === 3 ? "text-landing-dark" : "text-landing-text-muted"
        )}>
          Listo
        </span>
      </div>
    </div>
  );
};
