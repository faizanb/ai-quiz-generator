import React, { useEffect, useState } from 'react';

interface QuestionTimerInterface {
    timeout: number;
    onTimeout: () => void;
}

const QuestionTimer: React.FC<QuestionTimerInterface> = ({timeout, onTimeout}) => {

    const [timeRemaining, setTimeRemaining] = useState<number>(timeout);

    useEffect(() => {
        const settimeoutLabel = setTimeout(onTimeout, timeout);
        return(() => clearTimeout(settimeoutLabel));
    }, [timeout, onTimeout]);

    useEffect(() => {
        const setintervalLabel = setInterval(() => {
            setTimeRemaining((prevTimeRemaining) => prevTimeRemaining - 100);
        }, 100);
        return(() => clearInterval(setintervalLabel));
    }, []);

    return (
        <progress id="question-progress" max={timeout} value={timeRemaining} />
    )
}

export default QuestionTimer;