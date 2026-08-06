'use client';

import React, { useState } from 'react';

interface FlashcardProps {
  question: string;
  answer: string;
  hint?: string | null;
  cardNumber: number;
  totalCards: number;
}

export function Flashcard({ question, answer, hint, cardNumber, totalCards }: FlashcardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      setIsFlipped((prev) => !prev);
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto my-4 focus:outline-none">
      <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
        <span>Card {cardNumber} of {totalCards}</span>
        <span>Press <kbd className="px-1.5 py-0.5 bg-gray-200 dark:bg-gray-700 rounded text-xs font-mono">Space</kbd> to flip</span>
      </div>

      <div
        role="button"
        tabIndex={0}
        aria-label={`Flashcard ${cardNumber} of ${totalCards}: ${isFlipped ? 'Answer side' : 'Question side'}. Press Space or click to flip.`}
        aria-expanded={isFlipped}
        onClick={() => setIsFlipped(!isFlipped)}
        onKeyDown={handleKeyDown}
        className="w-full min-h-[260px] p-6 bg-white dark:bg-gray-800 border-2 border-indigo-600 dark:border-indigo-400 rounded-xl shadow-md flex flex-col justify-between cursor-pointer transition-all duration-300 hover:shadow-lg focus:ring-4 focus:ring-indigo-300 outline-none"
      >
        <div className="flex-1 flex items-center justify-center text-center my-4">
          <p className="text-xl font-bold text-gray-900 dark:text-gray-100 leading-relaxed">
            {isFlipped ? answer : question}
          </p>
        </div>

        <div className="text-xs text-center font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
          {isFlipped ? '✓ Answer View' : '❓ Question View (Click / Space)'}
        </div>
      </div>

      {hint && !isFlipped && (
        <details className="mt-3 text-sm text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800 p-3 rounded-lg border border-gray-200 dark:border-gray-700">
          <summary className="cursor-pointer font-medium text-indigo-600 dark:text-indigo-400 hover:underline focus:outline-none focus:ring-2 focus:ring-indigo-500">
            Need a hint?
          </summary>
          <p className="mt-2 text-gray-600 dark:text-gray-300">{hint}</p>
        </details>
      )}
    </div>
  );
}