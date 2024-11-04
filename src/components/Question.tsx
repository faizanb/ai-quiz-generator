import React, { useState } from 'react';
import { CodeBlock, dracula } from 'react-code-blocks';

import QuestionTimer from './QuestionTimer';
import QuestionOptions from './QuestionOptions';

interface QuestionInterface {
    activeQuesIndex: number;
    questionObj: any;
    onSelect: (index: number) => void;
    onSkip: () => void;
}

const Question: React.FC<QuestionInterface> = ({
    activeQuesIndex,
    questionObj,
    onSelect,
    onSkip
}) => {

    const [selectedOptionData, setSelectedOptionData] = useState<{
        answerIndex: number | null,
        isCorrect: boolean | null
    }>({
        answerIndex: null,
        isCorrect: null
    });

    const handleUserSelection = (index: number) => {
        setSelectedOptionData({
            answerIndex: index,
            isCorrect: null
        });

        setTimeout(() => {
            let isSelectionCorrect = false;
            if(questionObj.answer_index === index) {
                isSelectionCorrect = true;
            };
            setSelectedOptionData({
                answerIndex: index,
                isCorrect: isSelectionCorrect 
            })
            setTimeout(() => {
                onSelect(index);
            }, 1000);
        }, 1000);
    };

    

    let answeredState = '';
    if(selectedOptionData.answerIndex !== null) {
        answeredState = 'answered';
        if(selectedOptionData.isCorrect) {
            answeredState = 'correct';
        } else if(selectedOptionData.isCorrect === false) {
            answeredState = 'wrong';
        }
    }

    return (
        <div id='question'>
            <QuestionTimer timeout={10000} onTimeout={onSkip} />
            <h2>{`${activeQuesIndex + 1}. ${questionObj.question}`}</h2>
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
            <QuestionOptions
                key={activeQuesIndex}
                qOptions={questionObj.options} 
                userAnsweredIndex={selectedOptionData.answerIndex}
                answeredState={answeredState}
                onSelect={handleUserSelection}
            />
        </div>
    );
}

export default Question;