import { NextResponse } from 'next/server';
import { createGroq } from '@ai-sdk/groq';
import { generateObject } from 'ai';
import { DeckGenerationSchema } from '@/lib/ai-schema';

const groq = createGroq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { text } = await req.json();

    if (!text || typeof text !== 'string' || text.trim().length < 20) {
      return NextResponse.json(
        { error: 'Please enter at least 20 characters of study notes.' },
        { status: 400 }
      );
    }

    const result = await generateObject({
      model: groq('llama-3.3-70b-versatile'),
      schema: DeckGenerationSchema,
      prompt: `Analyze the following study notes and convert them into an interactive study deck containing flashcards and a 4-option quiz:\n\n${text}`,
    });

    return NextResponse.json(result.object);
  } catch (error: any) {
    console.error('AI Generation Error:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to generate study deck.' },
      { status: 500 }
    );
  }
}