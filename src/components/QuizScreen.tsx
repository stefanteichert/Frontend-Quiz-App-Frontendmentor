import { useState } from "react";
import type { Quiz } from "../types";
import iconCorrect from '../assets/images/icon-correct.svg';
import iconIncorrect from '../assets/images/icon-incorrect.svg';
import iconError from '../assets/images/icon-error.svg';
import { getButtonStyle, getLetterStyle } from '../utils/quizStyles';

interface QuizScreenProps {
  activeQuiz: Quiz | null;
  onScoreUpdate: () => void;
  onFinish: () => void;
}

const QuizScreen = ({ activeQuiz, onScoreUpdate, onFinish }: QuizScreenProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answerUser, setAnswerUser] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showError, setShowError] = useState(false);


  if (!activeQuiz) return null;

  const currentQuestion = activeQuiz.questions[currentIndex];
  const isLastQuestion = currentIndex === activeQuiz.questions.length - 1;
  const progress = (currentIndex / activeQuiz.questions.length) * 100;

  const handleAnswer = (option: string) => {
    if (isSubmitted) return;
    setAnswerUser(option);
    setShowError(false);
  };

  const handleSubmit = () => {
    if (answerUser === null) return setShowError(true);
    if (answerUser === currentQuestion.answer) onScoreUpdate();
    setIsSubmitted(true);
  };

  const handleNext = () => {
    if (isLastQuestion) return onFinish();
    setCurrentIndex((prev) => prev + 1);
    setAnswerUser(null);
    setIsSubmitted(false);
    setShowError(false);
  };

  /*   const getButtonStyle = (option: string) => {
      if (!isSubmitted) {
        return answerUser === option
          ? "ring-3 ring-purple-600"
          : "hover:ring-3 hover:ring-purple-600";
      }
      if (option === currentQuestion.answer) return "ring-3 ring-green-500";
      if (option === answerUser) return "ring-3 ring-red-500";
      return "";
    };
  
    const getLetterStyle = (option: string) => {
      if (!isSubmitted) {
        return answerUser === option
          ? "bg-purple-600 text-white"
          : "bg-grey-50 text-grey-500";
      }
      if (option === currentQuestion.answer) return "bg-green-500 text-white";
      if (option === answerUser) return "bg-red-500 text-white";
      return "bg-grey-50 text-grey-500";
    }; */

  return (
    <section className="flex flex-col gap-10 desktop:flex-row desktop:gap-32">

      <div className="w-full flex flex-col gap-4 desktop:gap-12 desktop:max-w-116.25 desktop:pb-4">
        <p className="text-preset-5 italic text-grey-500 tablet:text-preset-6 dark:text-blue-300">
          Question {currentIndex + 1} of {activeQuiz.questions.length}
        </p>
        <h1 className="text-preset-3 text-blue-900 dark:text-white">
          {currentQuestion.question}
        </h1>
        <div className="w-full h-4 bg-white dark:bg-blue-850 rounded-full p-1 mt-auto">
          <div
            className="h-full bg-purple-600 rounded-full transition-all duration-300 ease-in-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="flex flex-col gap-4 desktop:flex-1">
        {currentQuestion.options.map((option, index) => (
          <button
            type="button"
            key={option}
            onClick={() => handleAnswer(option)}
            className={`flex items-center gap-4 w-full p-4 rounded-xl tablet:rounded-3xl bg-white dark:bg-blue-850 shadow-sm transition-all hover:cursor-pointer ${getButtonStyle(option, answerUser, isSubmitted, currentQuestion.answer)}`}
          >
            <div
              className={`min-w-10 min-h-10 flex items-center justify-center rounded-lg transition-colors ${getLetterStyle(option, answerUser, isSubmitted, currentQuestion.answer)}`}
            >
              <span className="text-preset-4">
                {String.fromCharCode(65 + index)}
              </span>
            </div>
            <span className="text-blue-900 dark:text-white">{option}</span>

            {isSubmitted && option === currentQuestion.answer && (
              <img src={iconCorrect} alt="correct" className="ml-auto" />
            )}
            {isSubmitted && option === answerUser && option !== currentQuestion.answer && (
              <img src={iconIncorrect} alt="incorrect" className="ml-auto" />
            )}
          </button>
        ))}

        {!isSubmitted ? (
          <button
            type="button"
            onClick={handleSubmit}
            className="w-full p-4 rounded-2xl bg-purple-600 text-white shadow-sm hover:bg-purple-600/90 hover:cursor-pointer"
          >
            Submit Answer
          </button>
        ) : (
          <button
            type="button"
            onClick={handleNext}
            className="w-full p-4 rounded-2xl bg-purple-600 text-white shadow-sm hover:bg-purple-600/90 hover:cursor-pointer"
          >
            {isLastQuestion ? "See Results" : "Next Question"}
          </button>
        )}

        {showError && !answerUser && (
          <div className="flex items-center justify-center gap-2 text-red-500">
            <img src={iconError} alt="" />
            <p className="text-preset-5">Please select an answer</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default QuizScreen;