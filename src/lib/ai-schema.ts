import { z } from 'zod';

export const FlashcardSchema = z.object({
  question: z.string(),
  answer: z.string(),
  hint: z.string().nullable(),
});

export const QuizQuestionSchema = z.object({
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

export type DeckData = z.infer<typeof DeckGenerationSchema> & {
  flashcards: (z.infer<typeof FlashcardSchema> & { id: string })[];
  quiz: (z.infer<typeof QuizQuestionSchema> & { id: string })[];
};