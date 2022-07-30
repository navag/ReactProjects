import React, { FC } from 'react';
import Question from '../Questions/Question';
import { IQuestions, IReviewProps } from '../types';


const Review: FC<IReviewProps> = (props: IReviewProps) => {
    const { questions, currentStep, answers} = props;
    return <>
    <p>
      You have not answerd {questions.length - answers.length} questions. Please answer them.
    </p>
    {questions.map((item: IQuestions, parentIndex: number) => (
      <Question
        item={item}
        parentIndex={parentIndex}
        currentStep={currentStep}
        answer={answers.filter(ans => ans.questionId === parentIndex)}
      />
    ))}
  </>
}

export default Review;