import iconCorrect from '../assets/images/icon-correct.svg';
import iconIncorrect from '../assets/images/icon-incorrect.svg';
import { getButtonStyle, getLetterStyle } from '../utils/quizStyles';

interface AnswerOptionProps {
  option: string;
  index: number;
  answerUser: string | null;
  isSubmitted: boolean;
  correctAnswer: string;
  onAnswer: (option: string) => void;
}

const AnswerOption = ({ option, index, answerUser, isSubmitted, correctAnswer, onAnswer }: AnswerOptionProps) => {
  const isCorrect = option === correctAnswer;
  const isWrong = option === answerUser && !isCorrect;

  return (
    <button
      type="button"
      onClick={() => onAnswer(option)}
      aria-pressed={answerUser === option}
      aria-disabled={isSubmitted}
      className={`flex items-center gap-4 w-full p-4 rounded-xl tablet:rounded-3xl bg-white dark:bg-blue-850 shadow-sm transition-all hover:cursor-pointer ${getButtonStyle(option, answerUser, isSubmitted, correctAnswer)}`}
    >
      <div className={`min-w-10 min-h-10 flex items-center justify-center rounded-lg transition-colors ${getLetterStyle(option, answerUser, isSubmitted, correctAnswer)}`}>
        <span className="text-preset-4">{String.fromCharCode(65 + index)}</span>
      </div>
      <span className="text-blue-900 dark:text-white">{option}</span>
      {isSubmitted && isCorrect && <img src={iconCorrect} alt="" aria-hidden="true" className="ml-auto" />}
      {isSubmitted && isWrong && <img src={iconIncorrect} alt="" aria-hidden="true" className="ml-auto" />}
    </button>
  );
};

export default AnswerOption;