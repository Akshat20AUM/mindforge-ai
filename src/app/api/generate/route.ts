import { NextResponse } from 'next/server';
import { anthropic } from '@ai-sdk/anthropic';
import { generateObject } from 'ai';
import { DeckGenerationSchema } from '@/lib/ai-schema';

export async function POST(req: Request) {
  try {
    const { text } = await req.json();

    if (!text || typeof text !== 'string' || text.trim().length < 20) {
      return NextResponse.json(
        { error: 'Please enter at least 20 characters of study notes.' },
        { status: 400 }
      );
    }

    // Call Anthropic Claude API to generate structured deck JSON
    const result = await generateObject({
      model: anthropic('claude-3-5-sonnet-20240620'),
      schema: DeckGenerationSchema,
      prompt: `Analyze the following study notes or article and convert them into a structured study deck containing interactive flashcards and a 4-option multiple-choice quiz:\n\n${text}`,
    });

    return NextResponse.json(result.object);
  } catch (error) {
    console.error('Anthropic API Generation Error:', error);
    return NextResponse.json(
      { error: 'Failed to generate study deck from Anthropic API. Please try again or check your account balance.' },
      { status: 500 }
    );
  }
}