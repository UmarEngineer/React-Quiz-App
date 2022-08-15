import axios from "axios";
import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Start from "./Pages/Start/Start";
import Content from "./Pages/Content/Content";

const App = () => {
  const [questions, setQuestions] = useState("Yuklanyabdi...");

  const getUsers = async (amount = "", category = "") => {
    try {
      const { data } = await axios.get(
        `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=medium&type=multiple`
      );
      setQuestions(data.results);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<Start getUsers={getUsers} />} />

        <Route
          path="/content"
          element={
            <Content questions={questions} setQuestions={setQuestions} />
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
