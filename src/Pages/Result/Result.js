import "./Result.css";

const Result = ({ questions, score, setShowScore, navigate, setAlert }) => {
  return (
    <div className="answer">
      Siz {questions.length} ta savoldan {score} ta savolga to'g'ri javob
      berdingiz
      <button className="retry ok" onClick={() => setAlert(false)}>
        Test natijalarini ko'rib chiqish
      </button>
      <button className="retry" onClick={() => navigate("/")}>
        Qaytadan boshlash
      </button>
    </div>
  );
};

export default Result;
