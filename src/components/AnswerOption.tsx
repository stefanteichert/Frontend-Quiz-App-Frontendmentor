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
    <label
      className={`flex items-center gap-4 w-full p-4 rounded-xl tablet:rounded-3xl bg-white dark:bg-blue-850 shadow-sm transition-all cursor-pointer has-focus-visible:ring-3 has-focus-visible:ring-purple-600 ${getButtonStyle(option, answerUser, isSubmitted, correctAnswer)}`}
    >
      <input
        type="radio"
        name="answer"
        value={option}
        checked={answerUser === option}
        onChange={() => onAnswer(option)}
        disabled={isSubmitted}
        aria-label={
          !isSubmitted ? option :
            isCorrect ? `${option} – correct` :
              isWrong ? `${option} – incorrect` :
                option
        }
        className="sr-only"
      />
      <span className={`min-w-10 min-h-10 flex items-center justify-center rounded-lg transition-colors ${getLetterStyle(option, answerUser, isSubmitted, correctAnswer)}`}>
        <span className="text-preset-4">{String.fromCharCode(65 + index)}</span>
      </span>
      <span className="text-blue-900 dark:text-white">{option}</span>
      {isSubmitted && isCorrect && <img src={iconCorrect} alt="correct" aria-hidden="true" className="ml-auto" />}
      {isSubmitted && isWrong && <img src={iconIncorrect} alt="incorrect" aria-hidden="true" className="ml-auto" />}
    </label>
  );
};

export default AnswerOption;