import { useState } from 'react';
import Questions from './Questions/Questions';
import Result from './Result/Result';
import Review from './Review/Review';

import { questions } from './Constants';

import './App.css';
import { IAnswers } from './types';

function App() {
  const [step, setStep] = useState<number>(1);
  const [answers, setAnswers] = useState<IAnswers[]>([]);

  const onOptionClick = (parentIndex: number, childIndex: number) => {
    const isAlreadyAnswered = answers.some(ansObj => ansObj.questionId === parentIndex)
    if (isAlreadyAnswered) {
      const ansCopy = answers.map(ansObj => (
        ansObj.questionId === parentIndex ? { questionId: parentIndex, ansId: childIndex } : ansObj
      ));
      setAnswers(ansCopy);
    } else {
      setAnswers([
        ...answers,
        { questionId: parentIndex, ansId: childIndex }
      ]);
    }
  };

  const refresh = (stp: number) => {
    setStep(stp);
    setAnswers([]);
  };

  return (
    <div className="App">
      <header className="App-header">
        Header
      </header>
      <main>
        <div className="container">
          <div className="content">
            {step === 1 && (
              <Questions
                questions={questions}
                onOptionClick={onOptionClick}
                currentStep={step}
                answers={answers}
              />)}
            {step === 2 && (
              <Review
                questions={questions}
                answers={answers}
                currentStep={step}
              />)}
            {step === 3 && (
              <Result
                questions={questions}
                answers={answers}
                currentStep={step}
                refresh={refresh}
              />
            )}
          </div>
          {step !== 3 && (
            <div className="buttons">
              <button onClick={() => setStep(step - 1)} disabled={step === 1}>previous</button>
              <button onClick={() => step < 3 && setStep(step + 1)}>{step === 1 ? 'Next' : 'Submit'}</button>
            </div>
          )}
        </div>
      </main>
      <footer>This is footer</footer>
    </div>
  );
}

export default App;
