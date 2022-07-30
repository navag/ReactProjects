import React, { FC, useState } from 'react';

import { IQuestions, IQuestionsProps } from '../types';


import './Questions.css';
import Question from './Question';

const Questions: FC<IQuestionsProps> = (props: IQuestionsProps) => {
  const { questions, currentStep, onOptionClick, answers} = props;

  return <>
  <h2>Questions</h2>
  <p>answer below questions</p>
    {questions.map((item: IQuestions, parentIndex: number) => (
      <Question
        item={item}
        parentIndex={parentIndex}
        onOptionClick={onOptionClick}
        currentStep={currentStep}
        answer={answers.filter(ans => ans.questionId === parentIndex)}
      />
    ))}
  </>
}

export default Questions;