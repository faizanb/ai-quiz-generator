import OpenAI from "openai";

import Header from './components/Header';
import Quiz from './components/Quiz';

import './App.css';
import { useEffect, useState } from "react";

const PROXY_URL = import.meta.env.VITE_PROXY_URL;

const openai = new OpenAI({
  baseURL: `${PROXY_URL}/openai`,
  apiKey: "",
  dangerouslyAllowBrowser: true,
});

const generateQuiz = async (tech: string): Promise<string | null> => {
  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        "role": "user",
        "content": [
          {
            "type": "text",
            "text": `Generate 10 multiple choice questions on ${tech}. Should contain both theory and output based questions. Difficulty levels should be 3 easy, 4 medium and 3 difficult questions. should return answer as well in the final JSON`
          }
        ]
      },
    ],
    temperature: 1,
    max_tokens: 2048,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    response_format: {
      "type": "text"
    },
  });

  return completion.choices[0].message.content;
};

function App() {

  const [tech, setTech] = useState('React');
  const [quizData, setQuizData] = useState<any>(null);

  useEffect(() => {
    const generateAndSetQuiz = async () => {
      try {
        const response = await generateQuiz(tech);
        if (!response) {
          throw new Error("Failed to generate message.");
        }
        setQuizData(response);
      }catch (error) {
        console.error(error);
      }
    }

    generateAndSetQuiz();
  }, []);

  return (
    <>
      <Header />
      <Quiz quizData={quizData}/>
    </>
  )
}

export default App;
