"use client"

import React, { useState } from 'react';
import { Sidebar } from '@/components/sidebar';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';

import { StepIndicator, Step } from '@/components/add-book/step-indicator';
import { SearchPanel, Book } from '@/components/add-book/search-panel';
import { CreateManualPanel } from '@/components/add-book/create-manual-panel';
import { StatusPanel, BookStatus } from '@/components/add-book/status-panel';
import { SuccessPanel } from '@/components/add-book/success-panel';

export default function AddBookPage() {
  const [step, setStep] = useState<Step>(1);
  const [isManual, setIsManual] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<BookStatus | null>(null);

  const handleSelectBook = (book: Book) => {
    setSelectedBook(book);
    setIsManual(false);
    setStep(2);
  };

  const handleManualSubmit = (book: Book) => {
    setSelectedBook(book);
    setIsManual(true);
    setStep(2);
  };

  const handleFinish = (status: BookStatus) => {
    setSelectedStatus(status);
    setStep(3);
  };

  const handleBackToStep1 = () => {
    setStep(1);
    setIsManual(false);
  };

  return (
    <div className="flex min-h-screen bg-landing-cream text-landing-text">
      <Sidebar />
      
      <main className="flex-1 lg:ml-24">
        <header className="sticky top-0 z-40 flex h-16 items-center gap-4 border-b border-landing-sand bg-landing-cream/90 px-10 backdrop-blur-md">
          <Link href="/pages/library" className="flex items-center gap-2 text-[13.5px] text-landing-text-muted transition-colors hover:text-landing-text">
            <ChevronLeft className="size-4" /> Mi Biblioteca
          </Link>
          <div className="h-5 w-px bg-landing-sand" />
          <span className="font-playfair text-[15px] font-medium text-landing-dark">Añadir libro</span>
          <div className="ml-auto flex items-center gap-3">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-landing-tan to-landing-text-muted font-playfair text-[13.5px] font-semibold text-landing-warm-white">M</div>
              <span className="text-[13.5px] font-medium">Michelle</span>
            </div>
          </div>
        </header>

        <div className="mx-auto max-w-[960px] px-10 py-10 pb-20">
          
          <StepIndicator currentStep={step} isManual={isManual} />

          {step === 1 && !isManual && (
            <SearchPanel 
              onSelectBook={handleSelectBook} 
              onGoToManual={() => setIsManual(true)} 
              selectedBook={selectedBook}
            />
          )}

          {step === 1 && isManual && (
            <CreateManualPanel 
              onManualSubmit={handleManualSubmit}
              onBack={() => setIsManual(false)}
            />
          )}

          {step === 2 && selectedBook && (
            <StatusPanel 
              selectedBook={selectedBook}
              onFinish={handleFinish}
              onBack={handleBackToStep1}
            />
          )}

          {step === 3 && selectedBook && selectedStatus && (
            <SuccessPanel 
              selectedBook={selectedBook}
              status={selectedStatus}
              onAddAnother={() => window.location.reload()}
            />
          )}

        </div>
      </main>
    </div>
  );
}
