import { lazy, useEffect, useState } from 'react';
import OpenAI from 'openai';

import Header from './components/Header';
import Loader from './components/Loader';
import QuizSelect from './components/QuizSelect';
// import DUMMY_RESPONSE_JSON from './components/response.json';

const Quiz = lazy(() => import('./components/Quiz'));

import './App.css';

const PROXY_URL = import.meta.env.VITE_PROXY_URL;

const openai = new OpenAI({
  baseURL: `${PROXY_URL}/openai`,
  apiKey: "",
  dangerouslyAllowBrowser: true,
});

const generateQuiz = async (tech: Array<string>): Promise<string | null> => {
  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        "role": "user",
        "content": [
          {
            "type": "text",
            "text": `Generate 10 multiple choice questions on ${tech[0]}. Should contain both theory and output based questions. Should have 3 easy, 4 medium and 3 difficult questions. Should return JSON array of objects with each object having question, options, difficulty, answer_index and is_code_block. code_block should be a separate key with line breaks if is_code_block is true. question key should only contain text based question. if there is code block, send it in code_block key. answer_index should be index from options array.`
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
  const [tech, setTech] = useState<Array<string> | null>(null);
  const [quizData, setQuizData] = useState<any>(null);

  useEffect(() => {
    const generateAndSetQuiz = async () => {
      try {
        const response = await generateQuiz(tech!);
        if (!response) {
          throw new Error("Failed to generate message.");
        }
        setQuizData(JSON.parse(response));
      }catch (error) {
        console.error(error);
      }
    }
    tech && generateAndSetQuiz();
  }, [tech]);



  return (
    <>
      <Header />
      <main id="main-content">
        {!tech && 
          <QuizSelect onSelect={setTech} />
        }
        {tech?.length 
          && !quizData
          && <Loader />
        }
        {quizData && 
          <div id="quiz-wrap">
            <Quiz quizData={quizData}/>
          </div>
        }
      </main>
    </>
  )
}

export default App;
