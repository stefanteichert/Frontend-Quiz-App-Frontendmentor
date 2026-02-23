import { useQuiz } from "../hooks/useQuiz";
import type { Quiz } from "../types";
import iconError from '../assets/images/icon-error.svg';
import AnswerOption from "./AnswerOption";

interface QuizScreenProps {
  activeQuiz: Quiz;
  onScoreUpdate: () => void;
  onFinish: () => void;
}

const QuizScreen = ({ activeQuiz, onScoreUpdate, onFinish }: QuizScreenProps) => {
  const {
    currentQuestion, currentIndex, isLastQuestion,
    progress, answerUser, isSubmitted, showError,
    handleAnswer, handleSubmit, handleNext,
  } = useQuiz(activeQuiz, onScoreUpdate, onFinish);

  return (
    <section className="flex flex-col gap-6 desktop:grid desktop:grid-cols-2 desktop:grid-rows-[1fr_auto] desktop:gap-x-32">

      <div className="w-full flex flex-col gap-4 desktop:gap-12 desktop:max-w-116.25 desktop:row-start-1">
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

      <div className="flex flex-col gap-4 desktop:row-start-1" role="radiogroup" aria-label="Answer options">
        {currentQuestion.options.map((option, index) => (
          <AnswerOption
            key={option}
            option={option}
            index={index}
            answerUser={answerUser}
            isSubmitted={isSubmitted}
            correctAnswer={currentQuestion.answer}
            onAnswer={handleAnswer}
          />
        ))}
      </div>

      <div className="flex flex-col gap-4 relative desktop:col-start-2 desktop:row-start-2">
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
          <div className="absolute -bottom-10 left-0 right-0 flex items-center justify-center gap-2 text-red-500" role="alert">
            <img src={iconError} alt="" aria-hidden="true" />
            <p className="text-preset-5">Please select an answer</p>
          </div>
        )}
      </div>

    </section>
  );
};

export default QuizScreen;