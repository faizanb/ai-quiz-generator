import React, { useCallback, useState } from 'react';

import Question from './Question';
import Evaluation from './Evaluation';

const Quiz: React.FC<{quizData: any}> = (props) => {
    const [userAnwersIndex, setAnswersIndex] = useState<number[]>([]);
    const activeQuesIndex = userAnwersIndex.length;

    const { quizData } = props;
    const isQuizCompleted = activeQuesIndex === quizData.length;

    const handleUserSelection = useCallback((answerIndex: number) => {
        setAnswersIndex((prevAnswerIndex: number[]) => ([...prevAnswerIndex, answerIndex]));
    }, []);

    const handleAnswerSkipped = useCallback(() => handleUserSelection(-1), [handleUserSelection]);
    
    const questionObj = quizData[activeQuesIndex];

    if(isQuizCompleted) {
        return (
            <Evaluation 
                quizData={quizData}
                userAnwersIndex={userAnwersIndex}
            />
        );
    }

    return (
        <Question 
            key={activeQuesIndex}
            activeQuesIndex={activeQuesIndex}
            questionObj={questionObj}
            onSelect={handleUserSelection}
            onSkip={handleAnswerSkipped}

        />
    );
}

export default Quiz;