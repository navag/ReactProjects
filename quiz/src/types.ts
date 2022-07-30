export interface ISteps {
  step: 1 | 2 | 3
}
export interface IQuestionsProps {
questions: IQuestions[],
onOptionClick: (parentIndex: number, index: number) => void;
currentStep: number;
answers: IAnswers[];
}

export interface IAnswers { 
  questionId: number; 
  ansId: number 
}

export interface IResultProps {
  questions: IQuestions[];
  answers: IAnswers[];
  currentStep: number;
  refresh?: (step: number) => void;
}

export interface IReviewProps extends IResultProps {

}

export interface IQuestions {
id: number;
question: string;
options: string[];
}

export interface IQuestion {
  item: any;
  parentIndex: number; 
  onOptionClick?: (parentIndex: number, index: number) => void;
  currentStep: number;
  answer?: IAnswers[];
}