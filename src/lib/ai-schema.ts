import { z } from 'zod';

export const FlashcardSchema = z.object({
  id: z.string().optional().default(() => Math.random().toString(36).substring(2, 9)),
  question: z.string(),
  answer: z.string(),
  hint: z.string().optional(),
});

export const QuizQuestionSchema = z.object({
  id: z.string().optional().default(() => Math.random().toString(36).substring(2, 9)),
  question: z.string(),
  options: z.array(z.string()).min(4),
  correctAnswerIndex: z.coerce.number().min(0).max(3),
  explanation: z.string(),
});

export const DeckGenerationSchema = z.object({
  title: z.string(),
  summary: z.string(),
  flashcards: z.array(FlashcardSchema).min(1),
  quiz: z.array(QuizQuestionSchema).min(1),
});

export type DeckData = z.infer<typeof DeckGenerationSchema>;