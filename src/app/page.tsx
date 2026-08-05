'use client';

import React, { useState } from 'react';
import { DeckData } from '@/lib/ai-schema';
import { Flashcard } from '@/components/Flashcard';
import { Quiz } from '@/components/Quiz';

export default function Home() {
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [deck, setDeck] = useState<DeckData | null>(null);
  const [activeTab, setActiveTab] = useState<'flashcards' | 'quiz'>('flashcards');
  const [cardIndex, setCardIndex] = useState(0);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: inputText }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to generate study deck.');
      }

      setDeck(data);
      setCardIndex(0);
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-extrabold text-indigo-600 dark:text-indigo-400">
            MindForge AI
          </h1>
          <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 mt-2">
            Powered by Claude 3.5 Sonnet — Convert study notes into interactive flashcards and quizzes.
          </p>
        </header>

        <form onSubmit={handleGenerate} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 mb-8">
          <label htmlFor="notes-input" className="block text-sm font-semibold mb-2">
            Paste Study Notes or Lecture Transcript:
          </label>
          <textarea
            id="notes-input"
            rows={5}
            required
            minLength={20}
            placeholder="Paste your study materials here (minimum 20 characters)..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-transparent focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />

          {error && (
            <div role="alert" className="mt-3 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading || inputText.length < 20}
            className="mt-4 w-full md:w-auto px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-medium rounded-lg transition-colors focus:ring-4 focus:ring-indigo-300"
          >
            {loading ? 'Generating with Claude...' : 'Generate Deck ✨'}
          </button>
        </form>

        {deck && (
          <section className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-bold mb-1">{deck.title}</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">{deck.summary}</p>

            <div role="tablist" className="flex border-b border-gray-200 dark:border-gray-700 mb-6">
              <button
                role="tab"
                aria-selected={activeTab === 'flashcards'}
                onClick={() => setActiveTab('flashcards')}
                className={`py-2 px-4 font-semibold text-sm border-b-2 transition-colors ${
                  activeTab === 'flashcards'
                    ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                🎴 Flashcards ({deck.flashcards.length})
              </button>
              <button
                role="tab"
                aria-selected={activeTab === 'quiz'}
                onClick={() => setActiveTab('quiz')}
                className={`py-2 px-4 font-semibold text-sm border-b-2 transition-colors ${
                  activeTab === 'quiz'
                    ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                📝 Quiz ({deck.quiz.length})
              </button>
            </div>

            {activeTab === 'flashcards' && (
              <div>
                <Flashcard
                  question={deck.flashcards[cardIndex].question}
                  answer={deck.flashcards[cardIndex].answer}
                  hint={deck.flashcards[cardIndex].hint}
                  cardNumber={cardIndex + 1}
                  totalCards={deck.flashcards.length}
                />
                <div className="flex justify-center space-x-4 mt-4">
                  <button
                    type="button"
                    disabled={cardIndex === 0}
                    onClick={() => setCardIndex((i) => Math.max(0, i - 1))}
                    className="px-4 py-2 bg-gray-200 dark:bg-gray-700 disabled:opacity-40 rounded-lg text-sm font-medium"
                  >
                    ← Previous
                  </button>
                  <button
                    type="button"
                    disabled={cardIndex === deck.flashcards.length - 1}
                    onClick={() => setCardIndex((i) => Math.min(deck.flashcards.length - 1, i + 1))}
                    className="px-4 py-2 bg-gray-200 dark:bg-gray-700 disabled:opacity-40 rounded-lg text-sm font-medium"
                  >
                    Next →
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'quiz' && <Quiz questions={deck.quiz} />}
          </section>
        )}
      </div>
    </main>
  );
}