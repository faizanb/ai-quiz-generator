import React, { useCallback, useState } from 'react';
import { CodeBlock, dracula } from 'react-code-blocks';

import QuestionTimer from './QuestionTimer';

const Quiz: React.FC<{quizData: any}> = (props) => {
    const [answeredState, setAnsweredState] = useState<string>('');
    const [userAnwersIndex, setAnswersIndex] = useState<number[]>([]);
    const activeQuesIndex = answeredState === '' ? userAnwersIndex.length : userAnwersIndex.length - 1;

    const { quizData } = props;
    const isQuizCompleted = activeQuesIndex === quizData.length;

    const handleUserSelection = useCallback((answerIndex: number) => {
        const questionObj = quizData[activeQuesIndex];
        setAnsweredState('answered');
        setAnswersIndex((prevAnswerIndex: number[]) => ([...prevAnswerIndex, answerIndex]));
        setTimeout(() => {
            if(answerIndex === questionObj.answer_index) {
                setAnsweredState('correct');
            } else {
                setAnsweredState('wrong');
            }

            setTimeout(() => {
                setAnsweredState('');
            }, 1000);
        }, 1000);
    }, [activeQuesIndex]);

    const handleAnswerSkipped = useCallback(() => handleUserSelection(-1), [handleUserSelection]);

        
    if(isQuizCompleted) {
        return (
            <div id="quiz-evaluation">
                <h2>Congrats, you have completed the quiz!</h2>
            </div>
        );
    }
    const questionObj = quizData[activeQuesIndex];

    return (
        <div id='question'>
            <QuestionTimer key={activeQuesIndex} timeout={10000} onTimeout={handleAnswerSkipped} />
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
                {questionObj.options.map((option: any, optionIndex: number) => {
                    let highlightAnswerOnSelection = '';
                    const isSelected = userAnwersIndex[userAnwersIndex.length - 1] === optionIndex;

                    if(isSelected) {
                        if(answeredState === 'answered') {
                            highlightAnswerOnSelection = 'selected';
                        } else if(answeredState === 'correct' || answeredState === 'wrong') {
                            highlightAnswerOnSelection = answeredState;
                        }
                    }

                    return (
                        <li key={optionIndex} className='option'>
                            <button 
                                className={highlightAnswerOnSelection} 
                                onClick={() => handleUserSelection(optionIndex)}
                            >
                                {option}
                            </button>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default Quiz;