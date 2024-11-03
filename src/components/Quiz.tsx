import React, { useState } from 'react';
import { CodeBlock, dracula } from 'react-code-blocks';

const Quiz: React.FC<{quizData: any}> = (props) => {
    const [userAnwersIndex, setAnswersIndex] = useState<number[]>([]);
    const activeQuesIndex = userAnwersIndex.length;

    const { quizData } = props;

    const handleUserSelection = (answerIndex: number) => {
        setAnswersIndex((prevAnswerIndex: number[]) => ([...prevAnswerIndex, answerIndex]));
    }

    if(quizData) {
        const questionObj = quizData[activeQuesIndex];
        return (
            <div id='question'>
                <h2>{`${userAnwersIndex.length + 1}. ${questionObj.question}`}</h2>
                {questionObj.is_code_block ? 
                    <div className='code-block'>
                        <CodeBlock 
                            text={questionObj.code_block}
                            language={'jsx'}
                            showLineNumbers={true}
                            theme={dracula}
                        />
                    </div>
                    : null
                }
                <ul id='options'>
                    {questionObj.options.map((option: any) => (
                        <li key={option} className='option'>
                            <button onClick={() => handleUserSelection(questionObj.answer_index)}>{option}</button>
                        </li>
                    ))}
                </ul>
            </div>
        )
    }
    return null;
}

export default Quiz;