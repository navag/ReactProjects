import React, { FC } from 'react';
import { IQuestion } from '../types';

const Question: FC<IQuestion> = (props: IQuestion) => {
  const {
    item,
    parentIndex,
    onOptionClick,
    currentStep,
    answer
  } = props;
  const ansClass = currentStep === 2 ?
    answer && answer.length > 0 ? 'green' : 'red'
    : ''
  return <>
    <div className='question' key={item.question + parentIndex}>
      <span className={ansClass}> {parentIndex + 1}.</span> {`${item.question}`}
      <div className="options">
        {
          item.options.map((opt: string, index: number) => (
            <div className={currentStep === 1 ? 'option' : ''} key={opt + index}>
              <input
                checked={answer && answer.length > 0 && index === answer[0].ansId}
                disabled={currentStep === 2}
                onClick={() => onOptionClick && onOptionClick(parentIndex, index)} type="radio" id={`${parentIndex}-${index}`} name={`${parentIndex}`} value={index} />
              <label htmlFor={`${parentIndex}-${index}`}>{opt}</label>
            </div>
          ))
        }
      </div>
    </div>
  </>
}

export default Question;