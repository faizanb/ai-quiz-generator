import OpenAI from "openai";

import Header from './components/Header';
import Quiz from './components/Quiz';
import DUMMY_RESPONSE_JSON from './components/response.json';

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
            "text": `Generate 10 multiple choice questions on ${tech}. Should contain both theory and output based questions. Should have 3 easy, 4 medium and 3 difficult questions. Should return JSON array of objects with each object having question, options, difficulty, answer_index and is_code_block. answer_index should be index from options array. code_block should be a separate key with line breaks if is_code_block is true.`
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
      "type": "json_object"
    },
  });

  return completion.choices[0].message.content;
};

function App() {
  const [tech, setTech] = useState('React');
  const [quizData, setQuizData] = useState<any>(DUMMY_RESPONSE_JSON);

  useEffect(() => {
    const generateAndSetQuiz = async () => {
      try {
        const response = await generateQuiz(tech);
        if (!response) {
          throw new Error("Failed to generate message.");
        }
        setQuizData(JSON.parse(response));
      }catch (error) {
        console.error(error);
      }
    }

    //generateAndSetQuiz();
  }, []);

  return (
    <>
      <Header />
      {quizData && 
        <main id="quiz-wrap">
          <Quiz quizData={quizData}/>
      </main>}
    </>
  )
}

export default App;
