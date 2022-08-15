import React from "react";
import { useState, useEffect } from "react";
import Question from "../../components/Questions/Question";
import "./Content.css";
const Content = ({ questions, setQuestions }) => {
  const [variant, setVariant] = useState();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);

  useEffect(() => {
    setVariant(
      questions &&
        handleShuffle([
          questions[currentQuestion]?.correct_answer ?? [],
          ...(questions[currentQuestion]?.incorrect_answers ?? []),
        ])
    );
  }, [currentQuestion, questions]);

  const handleShuffle = (variant) => {
    return variant.sort(() => Math.random() - 0.5);
  };

  return (
    <div>
      <div>
        <Question
          questions={questions}
          currentQuestion={currentQuestion}
          setCurrentQuestion={setCurrentQuestion}
          variant={variant}
          correctAnswer={questions[currentQuestion]?.correct_answer}
          score={score}
          setScore={setScore}
        />
      </div>
    </div>
  );
};

export default Content;
