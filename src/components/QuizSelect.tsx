import React from 'react';

const QUIZ_SELECTION_DATA = [
    ["React", "jsx"],
    ["NodeJS", "javascript"],
    ["VueJS", "javascript"],
    ["NextJS", "jsx"]
];

interface QuizSelectInterface {
    onSelect: (tech: Array<string>) => void;
}

const QuizSelect: React.FC<QuizSelectInterface> = ({
    onSelect
}) => {
    return (
        <>
            <h2 id='quiz-select-hd'>Choose to start quiz</h2>
            <ul id="quiz-select">
                {QUIZ_SELECTION_DATA.map((data: Array<string>, index: number) => (
                    <li key={index} onClick={() => onSelect(data)}>
                        <button>{data[0]}</button>
                    </li>
                ))}
            </ul>
        </>
    );
}

export default QuizSelect;