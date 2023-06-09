import './App.css';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import StartPage from './Quiz-App/StartPage/StartPage';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Quiz from './Quiz-App/Quiz/Quiz';
import Result from './Quiz-App/Result/Result';

function App() {
  const [name,setName] = useState('');
  const [questions,setQuestions] = useState('');
  const [score,setScore] = useState(0);

  const fetchQuestions = async (category = "", difficulty = "") =>{
    const { data } = await axios.get(
      `https://opentdb.com/api.php?amount=10${
        category && `&category=${category}`
      }${difficulty && `&difficulty=${difficulty}`}&type=multiple`
    );
    setQuestions(data.results);
  }
  useEffect(()=>{
    fetchQuestions()
  },[])

  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={ <StartPage name={name} setName={setName} fetchQuestions={fetchQuestions}/> }/>
      <Route path='/quiz' element={ <Quiz name={name} score={score} setScore={setScore} questions={questions} setQuestions={setQuestions} /> }/>
      <Route path='/result' exact element={<Result name={name} score={score}/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
