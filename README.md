# AI Quiz Generator

A React + TypeScript app that generates multiple-choice quizzes using OpenAI's GPT models. Users select a technology, and the app creates a quiz with theory and code/output-based questions, tracks answers, and provides detailed evaluation.

## Features

- **AI-powered quiz generation** (OpenAI GPT-4o-mini via proxy)
- **Multiple choice questions** with code block support
- **Difficulty levels**: easy, medium, difficult
- **Timer** for each question
- **Immediate feedback** on answers
- **Quiz evaluation** with stats correct answers, and explanation
- **Responsive UI** with syntax-highlighted code

## Tech Stack

- [React 18](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [OpenAI Node SDK](https://github.com/openai/openai-node)
- [react-code-blocks](https://github.com/rajinwonderland/react-code-blocks)
- [Gateweaver](https://github.com/gateweaver/gateweaver) (for proxying OpenAI API)

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- An OpenAI API key

### Installation

```bash
git clone https://github.com/faizanb/ai-quiz-generator.git
cd ai-quiz-generator
npm install
```

### Environment Setup

1. **Proxy API Key**  
   Add `.env.gateweaver` to `proxy/.env.gateweaver` and set your OpenAI API key:

```
OPENAI_API_KEY=sk-...
CLIENT_URL=http://localhost:5173
```

- `OPENAI_API_KEY`: Your secret OpenAI API key. This is required for the proxy to authenticate requests to the OpenAI API. Never expose this key in your frontend code.
- `CLIENT_URL`: The URL where your frontend app runs (usually `http://localhost:5173` for Vite). This is used in the proxy's CORS policy to allow only your frontend to access the proxy endpoint.

2. **Vite Environment (`.env.local`)**  
   The .env.local file is used to configure environment variables for the frontend (Vite).
   Example:

```
VITE_PROXY_URL=http://localhost:8080
```

- `VITE_PROXY_URL` should match the port where your Gateweaver proxy runs.
  This variable is used in `App.tsx` to route OpenAI API requests through the proxy.

2. **Gateweaver Proxy Config**  
   The `gateweaver.yml` file defines how the proxy server forwards requests to the OpenAI API and applies security policies.
   Example:

```
policyDefinitions:
  cors:
    origin: "${CLIENT_URL}"
endpoints:
  - path: "/openai"
    target:
      url: "https://api.openai.com/v1"
    request:
      headers:
        Content-Type: "application/json"
        Authorization: "Bearer ${OPENAI_API_KEY}"
    policies:
      - cors
```

- This configuration ensures that API requests from your frontend are securely proxied to OpenAI, with CORS enabled for your client URL.
- The proxy injects your API key from `.env.gateweaver` and prevents exposing it to the frontend.

### Running Locally

Start the OpenAI proxy:

```bash
npm run proxy
```

In a new terminal, start the frontend:

```bash
npm run preview
```

Visit [http://localhost:4173/tequiz/](http://localhost:4173/tequiz/).

## Usage

1. Select a technology from the list.
2. Wait for the AI to generate a quiz.
3. Answer each question within the time limit.
4. View your results and review correct answers.

## Project Structure

```
src/
  components/
   App.tsx           # Main app logic, quiz generation
   QuizSelect.tsx    # Technology selection
   Quiz.tsx          # Quiz flow
   Question.tsx      # Renders questions, options, timer
   QuestionOptions.tsx
   QuestionTimer.tsx
   Evaluation.tsx    # Results and stats
   response.json     # Example quiz data
  index.css           # Main styles
  App.css             # Loader and overlay styles
  main.tsx            # Entry point
proxy/
  .env.gateweaver     # Proxy API key config
```

## Customization

- **Add technologies**: Edit the list in `QuizSelect.tsx`.
- **Change quiz prompt**: Update the prompt in `App.tsx` (`generateQuiz` function).
- **Styling**: Modify `index.css` and `App.css`.

## Linting

```bash
npm run lint
```

## Build

```bash
npm run build
```

## License

MIT

---

**Note:** This project uses OpenAI's API via a local proxy for security. Never expose your API key in the frontend.
