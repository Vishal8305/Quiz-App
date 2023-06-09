import { Button, CircularProgress } from "@material-ui/core";
import { useEffect, useState } from "react";
import QuestionPage from "../QuestionPage/QuestionPage";
import "./Quiz.css";
import Timer from "../Timer/Timer";

const Quiz = ({ name, questions, score, setScore, setQuestions }) => {
  const [options, setOptions] = useState();
  const [currQues, setCurrQues] = useState(0);
  const [timeOut, setTimeOut] = useState(false);

  useEffect(() => {
    setOptions(
      questions &&
        handleShuffle([
          questions[currQues]?.correct_answer,
          ...questions[currQues]?.incorrect_answers,
        ])
    );
  }, [currQues, questions]);

  console.log(questions);

  const handleShuffle = (options) => {
    return options.sort(() => Math.random() - 0.5);
  };

  return (

    <div className="main">
    {timeOut ? (<divn className="over">
        <h1>Game Over</h1>
        <h1>Your score: {score}</h1>
        <Button variant='contained' color='primary' size='large' style={{ alignSelf: 'center', marginTop: 20}} href='/'>Play Again</Button>
    </divn>):(
        <>
    
    <div className="quiz">
      <span className="subtitle">Welcome, {name}</span>

      {questions ? (
        <>
          <div className="quizInfo">
            <span className="category">{questions[currQues].category}</span>
            <span className="score">Score : {score}</span>
          </div>
          <div className="top">
                  <div className="timer">
                    <Timer
                      setStop={setTimeOut}
                      currQues={currQues}
                    />
                  </div>
                </div>
          <div className="bottom">
          <QuestionPage
            currQues={currQues}
            setCurrQues={setCurrQues}
            questions={questions}
            options={options}
            correct={questions[currQues]?.correct_answer}
            score={score}
            setScore={setScore}
          />
          </div>
          
        </>
      ) : (
        <CircularProgress
          style={{ margin: 100 }}
          color="inherit"
          size={150}
          thickness={1}
        />
      )}
      </div></>)}
    
    </div>
  );
};

export default Quiz;