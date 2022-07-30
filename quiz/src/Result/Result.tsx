import React, { FC, useEffect, useState } from 'react';
import { IResultProps } from '../types';
import { answers } from '../Constants';

import './Result.css';

const Result: FC<IResultProps> = (props: IResultProps) => {
    const { questions, answers: selectedAnswers, refresh } = props;
    const [ansNumber, setAnsNumber]  = useState(0)
    // let ansNumber = 0;
    useEffect(() => {
    let correctAns = 0;
        selectedAnswers.forEach((selectedAns) => {
            const isAnsCorrectAns = answers.filter(ans => ans.id ===  selectedAns.questionId && ans.ansId === selectedAns.ansId).length > 0;
            if (isAnsCorrectAns) {
                correctAns++;
            }
        });
        const ansNum = Number(((correctAns / questions.length) * 100).toFixed(2));
        setAnsNumber(ansNum);
    }, [selectedAnswers]);

    return <div className='result'>
        {
            Number(ansNumber) > 50 ? <p> congratulations!!!!!!!. You are passed with score {ansNumber}%.</p>
                : <p>Sorry!!!. Your result is Fail with score {ansNumber}%.</p>
        }
        <button onClick={() => refresh && refresh(1)}>Refresh</button>
    </div>
}

export default Result;