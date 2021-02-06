import React, { useEffect, useState } from 'react';
import './App.css';
import {api} from './services/quizapi';
import {QuizType} from './types/questiontypes';
import { QuestionCard } from "./components/display";


function App() {

  let [quiz,setquiz] = useState<QuizType[]>([]);
  let [currentStep, setCurrentStep] = useState(0);
  let [score, setScore] = useState(0);
  let [showResult, setShowResult] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const questions: QuizType[] = await api(5, 'easy');
      setquiz(questions)
    }
    fetchData();
  }, []);

  const handleSubmit = (e: React.FormEvent<EventTarget>, userAns: string) => {
    e.preventDefault();

    const currentQuestion: QuizType = quiz[currentStep];

    console.log("correct Ans: " + currentQuestion.correct_answer + "--user Selection:" + userAns + "Score: " + score )

    if (userAns === currentQuestion.correct_answer) {
      setScore(++score);
    }
    if (currentStep !== quiz.length - 1)
      setCurrentStep(++currentStep);
    else {
      setShowResult(true);
    }
  }
  

  if(!quiz.length)
    return <h3>Loading...</h3>

  if(showResult){
      return (<div className="question-container result-container">
        <h2>Result</h2>
  
        <p className="result-text">
          You final score is 
            <b> {score}</b> out of <b>{quiz.length}</b>
        </p>
      </div>)
    }

  return (
    <div className="App">
      <QuestionCard
          question={quiz[currentStep].question}
          options={quiz[currentStep].option}
          callback={handleSubmit}
      />
    </div>
  );
}

export default App;
