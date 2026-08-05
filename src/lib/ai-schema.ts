import { z } from 'zod';

export const FlashcardSchema = z.object({
  id: z.string(),
  question: z.string(),
  answer: z.string(),
  hint: z.string().optional(),
});

export const QuizQuestionSchema = z.object({
  id: z.string(),
  question: z.string(),
  options: z.array(z.string()).length(4),
  correctAnswerIndex: z.number().min(0).max(3),
  explanation: z.string(),
});

export const DeckGenerationSchema = z.object({
  title: z.string(),
  summary: z.string(),
  flashcards: z.array(FlashcardSchema).min(3),
  quiz: z.array(QuizQuestionSchema).min(3),
});

export type DeckData = z.infer<typeof DeckGenerationSchema>;