This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## MindForge AI

An interactive web app that converts raw study notes, transcripts, or textbook text into structured flashcard decks and practice quizzes. 

Built with Next.js, Tailwind CSS, Groq (Llama 3.3 70B), and Zod.

---

## 🔗 Links

- **Live Site:** [mindforge-ai-kbtt-two.vercel.app](https://mindforge-ai-kbtt-two.vercel.app/)
- **Repository:** [github.com/Akshat20AUM/mindforge-ai](https://github.com/Akshat20AUM/mindforge-ai)

---
---

## 🚀 Quick Start & Setup Instructions

Run the application locally using a single command:

```bash
npm install && npm run dev

---

## 💡 What it does & Why I built it

Passive studying (like re-reading notes or highlighting lines) isn't very effective for long-term memory retention. Active recall—testing yourself using flashcards and quizzes—works much better, but making flashcards manually takes a lot of time.

**MindForge AI** speeds up this process. You paste in study notes or lecture text, and the app uses Groq's Llama 3.3 70B model to parse the concepts and instantly output:
1. **Interactive Flashcards** with flip states for question/answer review.
2. **Multiple-Choice Quizzes** with 4 choices, instant feedback, and explanations for each answer.

Instead of a generic chatbot conversation, the output is strictly parsed using Zod schemas to render actual interactive UI components.

---

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **AI Integration:** Vercel AI SDK (`@ai-sdk/groq`)
- **LLM Provider:** Groq (`llama-3.3-70b-versatile`)
- **Schema Validation:** Zod
- **Deployment:** Vercel

---

## 📁 Project Structure

```text
mindforge-ai/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── generate/
│   │   │       └── route.ts     # Route handler calling Groq + Zod validation
│   │   ├── layout.tsx           # Global font, styles, and meta tags
│   │   └── page.tsx             # Main screen containing state & input form
│   ├── components/
│   │   ├── Flashcard.tsx        # Card flip component with keyboard support
│   │   └── Quiz.tsx             # Quiz UI with radio selections & scoring
│   └── lib/
│       └── ai-schema.ts         # Zod schemas for Flashcards and Quiz structure
├── .env.local                   # API keys (git-ignored)
└── package.json

