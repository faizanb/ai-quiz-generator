import React, { useEffect, useRef, useState } from 'react';

interface QuestionTimerInterface {
    timeout: number;
    userAnsweredIndex: number | null;
    onTimeout: () => void;
}

const QuestionTimer: React.FC<QuestionTimerInterface> = ({
    timeout,
    userAnsweredIndex,
    onTimeout
}) => {

    const [timeRemaining, setTimeRemaining] = useState<number>(timeout);
    const timeoutRef = useRef<ReturnType<typeof setTimeout>>();
    const intervalRef = useRef<ReturnType<typeof setInterval>>();

    if(userAnsweredIndex !== null) {
        clearTimeout(timeoutRef.current);
        clearInterval(intervalRef.current);
    }

    useEffect(() => {
        timeoutRef.current = setTimeout(onTimeout, timeout);
        return(() => clearTimeout(timeoutRef.current));
    }, [timeout, onTimeout]);

    useEffect(() => {
        intervalRef.current = setInterval(() => {
            setTimeRemaining((prevTimeRemaining) => prevTimeRemaining - 100);
        }, 100);
        return(() => clearInterval(intervalRef.current));
    }, []);

    return (
        <progress id="question-progress" max={timeout} value={timeRemaining} />
    )
}

export default QuestionTimer;