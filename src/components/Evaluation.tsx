import React from "react";
import { CodeBlock, dracula } from "react-code-blocks";

interface EvaluationInterface {
  quizData: Array<any>;
  userAnwersIndex: Array<number>;
}

const Evaluation: React.FC<EvaluationInterface> = ({
  quizData,
  userAnwersIndex,
}) => {
  const skipped = userAnwersIndex.filter((answerIndex) => answerIndex === -1);
  const answeredCorrect = userAnwersIndex.filter(
    (answerIndex, index) => quizData[index].answer_index === answerIndex
  );

  const skippedPercent = Math.round(
    (skipped.length / userAnwersIndex.length) * 100
  );
  const answeredCorrectPercent = Math.round(
    (answeredCorrect.length / userAnwersIndex.length) * 100
  );
  const answeredWrongPercent = 100 - answeredCorrectPercent - skippedPercent;

  return (
    <div id="quiz-evaluation">
      <h2>Congrats, you have completed the quiz!</h2>
      <div id="quiz-stats">
        <p>
          <span className="percent skipped">{`${skippedPercent}%`}</span>
          <span className="bracket">Skipped</span>
        </p>
        <p>
          <span className="percent correct">{`${answeredCorrectPercent}%`}</span>
          <span className="bracket">Answered Correctly</span>
        </p>
        <p>
          <span className="percent wrong">{`${answeredWrongPercent}%`}</span>
          <span className="bracket">Answered Incorrectly</span>
        </p>
      </div>
      <ol>
        {userAnwersIndex.map((answerIndex, index) => {
          const questionObj = quizData[index];
          let answerClass = "user-answer";
          let isCorrectAnswered = false;
          if (answerIndex === -1) {
            answerClass += " skipped";
          } else if (answerIndex === questionObj.answer_index) {
            answerClass += " correct";
            isCorrectAnswered = true;
          } else {
            answerClass += " wrong";
          }
          return (
            <li key={questionObj.question}>
              <h3>{index + 1}</h3>
              <div className="question">
                <p className="question-text">{questionObj.question}</p>
                {questionObj.is_code_block ? (
                  <div className="code-block">
                    <CodeBlock
                      text={questionObj.code_block}
                      language={"jsx"}
                      showLineNumbers={true}
                      theme={dracula}
                    />
                  </div>
                ) : null}
              </div>
              <p className={answerClass}>
                {answerIndex !== -1 ? (
                  <>
                    <span className="answer-label">Given Answer: </span>
                    <span>{questionObj.options[answerIndex]}</span>
                  </>
                ) : (
                  "Skipped"
                )}
              </p>
              {!isCorrectAnswered && (
                <p className="correct-answer">
                  {
                    <>
                      <span className="answer-label">Correct Answer: </span>
                      <span>
                        {questionObj.options[questionObj.answer_index]}
                      </span>
                    </>
                  }
                </p>
              )}
              <p className="ans-explanation">
                <b>Explanation: </b>
                {questionObj.explanation}
              </p>
            </li>
          );
        })}
      </ol>
    </div>
  );
};

export default Evaluation;
