import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Categories from "../../Categories/Categories";
import "./Start.css";

const Start = ({ getUsers }) => {
  const [amount, setAmount] = useState();
  const [category, setCategory] = useState();
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const handleGet = () => {
    if (!amount || !category) {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 1500);
      return;
    } else {
      getUsers(amount, category);
      navigate("/content");
      setError(false);
    }
  };

  return (
    <div className="start">
      <div className="start-main">
        <h2 className="start-text">
          Testni boshlash uchun quyidagi formani to'ldiring
        </h2>
        <div className="test-amount">
          <label htmlFor="son" id="son-label">
            Testlar soni
          </label>
          <select id="son" onChange={(e) => setAmount(e.target.value)}>
            <option defaultValue={true}>Testlar sonini belgilang</option>
            <option value="10" key="10">
              10
            </option>
            <option value="15" key="15">
              15
            </option>
            <option value="20" key="20">
              20
            </option>
            <option value="25" key="25">
              25
            </option>
            <option value="30" key="30">
              30
            </option>
          </select>
        </div>

        <div className="test-type">
          <label htmlFor="tur" id="tur-label">
            Test turi
          </label>
          <select id="tur" onChange={(e) => setCategory(e.target.value)}>
            <option defaultValue={true}>Testlar turini tanlang</option>
            {Categories.map((category) => (
              <option value={category.value} key={category.category}>
                {category.category}
              </option>
            ))}
          </select>
          <button onClick={handleGet} className="start-action">
            Testni boshlash
          </button>
        </div>
        {error && <h3 className="error">Iltimos avval formani to'ldiring</h3>}
      </div>
    </div>
  );
};

export default Start;
