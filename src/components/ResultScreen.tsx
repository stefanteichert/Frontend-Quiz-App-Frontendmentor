import type { Quiz } from "../types";
import { getTopicTheme } from "../constants/quizTheme";
import { useRef, useEffect } from "react";

interface ResultScreenProps {
  score: number;
  resetQuiz: () => void;
  selectedQuiz: Quiz | null;
}

const ResultScreen = ({ score, resetQuiz, selectedQuiz }: ResultScreenProps) => {
  const quizTheme = selectedQuiz ? getTopicTheme(selectedQuiz.title) : null;
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  return (
    <section aria-label="Quiz results" className="flex flex-col gap-10 desktop:flex-row desktop:gap-32">
      <div className="w-full flex flex-col gap-4 desktop:gap-12 desktop:max-w-116.25  desktop:pb-4">
        <h1 ref={headingRef} tabIndex={-1} className="flex flex-col gap-2 outline-none">
          <span className="text-preset-2-light text-blue-900 dark:text-white">Quiz completed</span>
          <span aria-hidden="true" className="text-preset-2-medium text-blue-900 dark:text-white">You scored...</span>
        </h1>
      </div>
      <div className="flex flex-col gap-4 desktop:flex-1">
        <div className="flex flex-col gap-4 desktop:flex-1 bg-white rounded-2xl p-8 tablet:p-12 items-center dark:bg-blue-850 ">
          <div className="flex items-center gap-4" aria-hidden="true">
            {selectedQuiz && (
              <>
                <div className={`p-2 rounded-lg ${quizTheme?.bg}`} >
                  <img src={selectedQuiz.icon} alt="" className="w-5.5 h-6.25" aria-hidden="true" />
                </div>
                <span className="text-preset-4 text-blue-900 dark:text-white">
                  {selectedQuiz.title}
                </span>
              </>
            )}
          </div>
          <div
            aria-label={`You scored ${score} out of ${selectedQuiz?.questions.length}`}
            className="flex flex-col items-center gap-4"
          >
            <p aria-hidden="true" className="text-blue-900 dark:text-white text-preset-1">{score}</p>
            <p aria-hidden="true" className="text-grey-500 dark:text-blue-300 text-preset-4">out of {selectedQuiz?.questions.length}</p>
          </div>
        </div>
        <button
          type="button"
          onClick={resetQuiz}
          className="w-full p-4 rounded-2xl bg-purple-600 text-white shadow-sm hover:bg-purple-600/90 hover:cursor-pointer"
        >
          Play again
        </button>
      </div>

    </section>
  )
}

export default ResultScreen