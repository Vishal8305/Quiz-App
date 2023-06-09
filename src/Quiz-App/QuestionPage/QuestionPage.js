import { Button } from "@material-ui/core";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ErrorPage from "../ErrorPage/ErrorPage";
import './QuestionPage.css'

const QuestionPage = ({
  currQues,
  setCurrQues,
  questions,
  options,
  correct,
  setScore,
  score,
}) => {
  const [selected, setSelected] = useState();
  const [error, setError] = useState(false);

  const navigate = useNavigate();
  console.log(options);

  const handleSelect = (i) => {
    if (selected === i && selected === correct) {
      return "select";
    } else if (selected === i && selected !== correct) {
      return "wrong";
    } else if (i === correct) {
      return "select";
    }
  };

  const handleCheck = (i) => {
    setSelected(i);
    if (i === correct) setScore(score + 1);
    setError(false);
  };

  const handleNext = () => {
    if (currQues > 5) {
      navigate("/result");
    } else if (selected) {
      setCurrQues(currQues + 1);
      setSelected();
    } else setError("Please select an option first");
  };

  const handleQuit = () => {
    setCurrQues(0);
  };
  return (
    <div className="trivia">
    <h1 className="questions">Question {currQues +1}</h1>
    <div >
      <div className="question">{questions[currQues].question}</div>
      <div className="options">
        {error && <ErrorPage>{error}</ErrorPage>}
        {options &&
          options.map((i) => (
            <div
              className={`singleOption ${selected && handleSelect(i)}`}
              key={i}
              onClick={() => handleCheck(i)}
              disabled={selected}
            >
              {i}
            </div>
          ))}
      </div>
      <div className="controls">
        <Button
          variant="contained"
          color="secondary"
          size="large"
          style={{ width: 185 ,marginBottom:40}}
          href="/"
          onClick={() => handleQuit()}
        >
          Quit
        </Button>
        <Button
          variant="contained"
          color="primary"
          size="large"
          style={{ width: 185 ,marginBottom:40}}
          onClick={handleNext}
        >
          {currQues > 20 ? "Submit" : "Next Question"}
        </Button>
      </div>
    </div>
    </div>
  );
};

export default QuestionPage;
