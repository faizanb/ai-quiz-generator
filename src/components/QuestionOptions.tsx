import React from 'react';

interface QuestionOptionsInteface {
    qOptions: Array<any>;
    userAnsweredIndex: number | null;
    answeredState: string;
    onSelect: (index: number) => void;
}

const QuestionOptions: React.FC<QuestionOptionsInteface> = ({
    qOptions,
    userAnsweredIndex,
    answeredState,
    onSelect
}) => {
    return (
        <ul id='options'>
            {qOptions.map((option: any, optionIndex: number) => {
                let highlightAnswerOnSelection = '';
                let disabledFlag = false;
                const isSelected = userAnsweredIndex === optionIndex;

                if(answeredState !== '') {
                    disabledFlag = true;
                }

                if(isSelected) {
                    disabledFlag = false;
                    if(answeredState === 'answered') {
                        highlightAnswerOnSelection = 'selected';
                    } else if(answeredState === 'correct' || answeredState === 'wrong') {
                        highlightAnswerOnSelection = answeredState;
                    }
                }

                return (
                    <li key={optionIndex} className='option'>
                        <button 
                            disabled={disabledFlag}
                            className={highlightAnswerOnSelection} 
                            onClick={() => onSelect(optionIndex)}
                        >
                            {option}
                        </button>
                    </li>
                );
            })}
        </ul>
    );
}

export default QuestionOptions;