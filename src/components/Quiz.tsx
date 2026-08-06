'use client';

import React, { useState } from 'react';

interface QuizQuestion {
  id?: string;
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}

interface QuizProps {
  questions: QuizQuestion[];
}

export function Quiz({ questions }: QuizProps) {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [score, setScore] = useState(0);

  const current = questions[questionIndex];
  const isLast = questionIndex === questions.length - 1;
  const isCorrect = selectedOption === current.correctAnswerIndex;

  const handleSelect = (index: number) => {
    if (revealed) return;
    setSelectedOption(index);
  };

  const handleCheck = () => {
    if (selectedOption === null) return;
    setRevealed(true);
    if (selectedOption === current.correctAnswerIndex) {
      setScore((s) => s + 1);
    }
  };

  const handleNext = () => {
    setQuestionIndex((i) => Math.min(questions.length - 1, i + 1));
    setSelectedOption(null);
    setRevealed(false);
  };

  const handleRestart = () => {
    setQuestionIndex(0);
    setSelectedOption(null);
    setRevealed(false);
    setScore(0);
  };

  const finished = revealed && isLast;

  return (
    <div className="w-full max-w-lg mx-auto my-4">
      <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
        <span>
          Question {questionIndex + 1} of {questions.length}
        </span>
        <span>Score: {score}</span>
      </div>

      <div className="w-full min-h-[260px] p-6 bg-white dark:bg-gray-800 border-2 border-indigo-600 dark:border-indigo-400 rounded-xl shadow-md flex flex-col justify-between">
        <p className="text-lg font-bold text-gray-900 dark:text-gray-100 leading-relaxed mb-4">
          {current.question}
        </p>

        <div className="flex flex-col gap-2" role="radiogroup" aria-label="Answer options">
          {current.options.map((option, index) => {
            const isSelected = selectedOption === index;
            const isRightAnswer = index === current.correctAnswerIndex;

            let optionClasses =
              'w-full text-left px-4 py-2.5 rounded-lg border text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500';

            if (revealed) {
              if (isRightAnswer) {
                optionClasses +=
                  ' bg-green-100 dark:bg-green-900/40 border-green-500 text-green-800 dark:text-green-300';
              } else if (isSelected && !isRightAnswer) {
                optionClasses +=
                  ' bg-red-100 dark:bg-red-900/40 border-red-500 text-red-800 dark:text-red-300';
              } else {
                optionClasses +=
                  ' bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400';
              }
            } else {
              optionClasses += isSelected
                ? ' bg-indigo-50 dark:bg-indigo-900/40 border-indigo-500 text-indigo-700 dark:text-indigo-300'
                : ' bg-transparent border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700';
            }

            return (
              <button
                key={index}
                type="button"
                role="radio"
                aria-checked={isSelected}
                disabled={revealed}
                onClick={() => handleSelect(index)}
                className={optionClasses}
              >
                {option}
              </button>
            );
          })}
        </div>

        {revealed && (
          <div
            role="alert"
            className={`mt-4 p-3 rounded-lg text-sm ${
              isCorrect
                ? 'bg-green-100 dark:bg-green-900/40 text-green-800 dark:text-green-300'
                : 'bg-red-100 dark:bg-red-900/40 text-red-800 dark:text-red-300'
            }`}
          >
            <p className="font-semibold mb-1">
              {isCorrect ? '✓ Correct!' : '✗ Not quite.'}
            </p>
            <p>{current.explanation}</p>
          </div>
        )}
      </div>

      <div className="flex justify-center gap-4 mt-4">
        {!revealed && (
          <button
            type="button"
            disabled={selectedOption === null}
            onClick={handleCheck}
            className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-medium rounded-lg transition-colors focus:ring-4 focus:ring-indigo-300"
          >
            Check Answer
          </button>
        )}

        {revealed && !isLast && (
          <button
            type="button"
            onClick={handleNext}
            className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors focus:ring-4 focus:ring-indigo-300"
          >
            Next Question →
          </button>
        )}

        {finished && (
          <button
            type="button"
            onClick={handleRestart}
            className="px-6 py-2.5 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-gray-100 font-medium rounded-lg transition-colors"
          >
            Restart Quiz
          </button>
        )}
      </div>

      {finished && (
        <p className="text-center mt-4 text-sm text-gray-600 dark:text-gray-400">
          Final score: {score} / {questions.length}
        </p>
      )}
    </div>
  );
}