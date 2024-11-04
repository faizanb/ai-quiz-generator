import React from 'react';
import { CodeBlock, dracula } from 'react-code-blocks';

interface EvaluationInterface {
    quizData: Array<any>;
    userAnwersIndex: Array<number>;
};

const Evaluation: React.FC<EvaluationInterface> = ({
    quizData,
    userAnwersIndex
}) => {
    const skipped = userAnwersIndex.filter((answerIndex) => answerIndex === -1);
    const answeredCorrect = userAnwersIndex.filter((answerIndex, index) => quizData[index].answer_index === answerIndex);

    const skippedPercent = Math.round((skipped.length / userAnwersIndex.length) * 100);
    const answeredCorrectPercent = Math.round((answeredCorrect.length / userAnwersIndex.length) * 100);
    const answeredWrongPercent = 100 - answeredCorrectPercent - skippedPercent;
    
    return (
        <div id="quiz-evaluation">
            <h2>Congrats, you have completed the quiz!</h2>
            <div id="quiz-stats">
                <p>
                    <span className='percent skipped'>{`${skippedPercent}%`}</span>
                    <span className='bracket'>Skipped</span>
                </p>
                <p>
                    <span className='percent correct'>{`${answeredCorrectPercent}%`}</span>
                    <span className='bracket'>Answered Correctly</span>
                </p>
                <p>
                    <span className='percent wrong'>{`${answeredWrongPercent}%`}</span>
                    <span className='bracket'>Answered Incorrectly</span>
                </p>
            </div>
            <ol>
                {userAnwersIndex.map((answerIndex, index) => {
                    let answerClass = 'user-answer';
                    if(answerIndex === -1) {
                        answerClass += ' skipped';
                    } else if(answerIndex === quizData[index].answer_index) {
                        answerClass += ' correct';
                    } else {
                        answerClass += ' wrong';
                    }
                    return (
                        <li key={quizData[index].question}>
                            <h3>{index + 1}</h3>
                            <div className='question'>
                                <p className='question-text'>{quizData[index].question}</p>
                                {quizData[index].is_code_block ? 
                                    <div className='code-block'>
                                        <CodeBlock 
                                            text={quizData[index].code_block}
                                            language={'jsx'}
                                            showLineNumbers={true}
                                            theme={dracula}
                                        />
                                    </div>
                                    : null
                                }
                            </div>
                            <p className={answerClass}>
                                {answerIndex !== -1 ? quizData[index].options[answerIndex] : 'Skipped'}
                            </p>
                        </li>
                    );
                })}
            </ol>
        </div>  
    );
}

export default Evaluation;