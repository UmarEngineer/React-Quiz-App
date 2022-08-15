import "./Variants.css";

const Variants = ({ variant, handleCheckAnswer, selected, handleSelect }) => {
  return (
    <div className="question-variants">
      {variant &&
        variant.map((vart) => (
          <button
            key={vart}
            onClick={() => handleCheckAnswer(vart)}
            className={`variant  ${selected && handleSelect(vart)}`}
          >
            {vart}
          </button>
        ))}
    </div>
  );
};

export default Variants;
