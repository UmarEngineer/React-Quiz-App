import { useState } from "react";
import "./Question.css";
import { useNavigate } from "react-router-dom";
import Result from "../../Pages/Result/Result";
import Pagination from "./Pagination/Pagination";
import Variants from "./Variants/Variants";
import Alert from "../Alert/Alert";
// import Timer from "./Timer";

const Question = ({
  questions,
  correctAnswer,
  currentQuestion,
  setCurrentQuestion,
  variant,
  score,
  setScore,
}) => {
  const [showScore, setShowScore] = useState(false);
  const [selected, setSelected] = useState();
  const list = [];
  const [active, setActive] = useState(0);
  const [isSubmit, setIsSubmit] = useState(false);
  const [selectedList, setSelectedList] = useState([]);
  const [wrongSelected, setWrongSelected] = useState([]);
  const [correctPgn, setCorrectPgn] = useState([]);
  const [incorrectPgn, setIncorrectPgn] = useState([]);
  const [alert, setAlert] = useState(false)

  const navigate = useNavigate();

  for (let i = 0; i < questions.length; i++) {
    list.push(i);
  }

  const handleCheckAnswer = (vart) => {
    if (selectedList.indexOf(currentQuestion) === -1) {
      setSelected(vart);
    }
  };

  const handleSelect = (vart) => {
    if (isSubmit) {
      if (selected === vart && selected === correctAnswer) {
        return "correct";
      } else if (selected === vart && selected !== correctAnswer) {
        return "wrong";
      } else if (vart === correctAnswer) {
        return "correct";
      }
      for (let i = 0; i < wrongSelected.length; i++) {
        if (vart === wrongSelected[i]) {
          return "wrong";
        }
      }
    } else if (vart === selected) {
      return "select";
    }
  };

  const handleSelectBtn = (btnItem) => {
    if (active === btnItem) {
      return "activeBtn";
    } else if (correctPgn.indexOf(btnItem) !== -1) {
      return "correct";
    }
    for (let i = 0; i < incorrectPgn.length; i++) {
      if (btnItem === incorrectPgn[i]) {
        return "wrong";
      }
    }
  };

  const handlePagination = (btnItem) => {
    console.log(btnItem);
    setCurrentQuestion(btnItem);
    setActive(btnItem);
    selectedList.indexOf(btnItem) !== -1
      ? setIsSubmit(true)
      : setIsSubmit(false);
  };

  const handleSubmit = () => {
    if (
      selected === correctAnswer &&
      selectedList.indexOf(currentQuestion) === -1
    ) {
      setScore(score + 1);
      setCorrectPgn((correctPgn) => correctPgn.concat(currentQuestion));
    }
    const nextQuestion = currentQuestion + 1;
    setSelectedList((selectedList) => selectedList.concat(currentQuestion));
    
    if (selected && nextQuestion < questions.length) {
      setIsSubmit(true);
    } else {
      setAlert(true)
      if(selectedList.length + 1 === questions.length){
        setShowScore(true);
      }
    }
    if (selected !== correctAnswer) {
      setWrongSelected((wrongSelected) => wrongSelected.concat([selected]));
      setIncorrectPgn((incorrectPgn) => incorrectPgn.concat(currentQuestion));
    }
  };

  const handleNext = () => {
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      selectedList.indexOf(nextQuestion) !== -1
        ? setIsSubmit(true)
        : setIsSubmit(false);
      setCurrentQuestion(nextQuestion);
      setActive(nextQuestion);
    } else {
      setAlert(true)
      if(selectedList.length === questions.length){
        setShowScore(true);
      }
    }
  };

  const handlePrev = () => {
    const prevQuestion = currentQuestion - 1;
    if (prevQuestion < questions.length) {
      selectedList.indexOf(prevQuestion) !== -1
        ? setIsSubmit(true)
        : setIsSubmit(false);
      setCurrentQuestion(prevQuestion);
      setActive(prevQuestion);
    } else {
      setShowScore(true);
    }
  };

  const handleEndTest = () => {
    setAlert(true)
    if(selectedList.length === questions.length){
      setShowScore(true);
    }
  }

  return (
    <div>
      {alert ? (
        showScore ? (
          <Result
            questions={questions}
            score={score}
            setShowScore={setShowScore}
            setAlert={setAlert}
            navigate={navigate}
      /> ) :
        <Alert 
          setShowScore={setShowScore}
          setAlert={setAlert}
          notSelected={questions.length - selectedList.length}
        />
        )
       : ( 
        <>
          <div className="question">
            <div className="question-top">
              <button className="retry top" onClick={() => navigate("/")}>
                Qayta urunish
              </button>

              <Pagination
                list={list}
                handlePagination={handlePagination}
                handleSelectBtn={handleSelectBtn}
              />

              <button
                className="question-endaction"
                onClick={handleEndTest}
              >
                Testni yakunlash
              </button>
            </div>

            <div>
              <div className="score">
                <span className="correct-score">{score}</span> /{" "}
                {questions.length}
              </div>
            </div>
            <div className="question-items">
              <div className="question-text">
                {questions && questions[currentQuestion].question}
              </div>

              <Variants
                variant={variant}
                handleCheckAnswer={handleCheckAnswer}
                handleSelect={handleSelect}
                selected={selected}
              />
            </div>
            <div className="question-actions">
              <button className="prev-action" onClick={handlePrev}>
                PREV
              </button>
              <button className="submit-action" onClick={handleSubmit}>
                SUBMIT
              </button>
              <button className="next-action" onClick={handleNext}>
                NEXT
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Question;
