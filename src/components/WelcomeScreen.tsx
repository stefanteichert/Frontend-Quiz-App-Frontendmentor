import type { Quiz } from "../types";
import { getTopicTheme } from "../constants/quizTheme";

interface WelcomeScreenProps {
  quizzes: Quiz[];
  onSelect: (quizTitle: string) => void;
}



const WelcomeScreen = ({ quizzes, onSelect }: WelcomeScreenProps) => {
  return (
    <section className="flex flex-col md:flex-row gap-10">
      <div className="flex flex-col gap-4">
        <h1 className="flex flex-col gap-2">
          <span className="text-preset-2-light text-blue-900 dark:text-white">Welcome to the</span>
          <span className="text-preset-2-medium text-blue-900 dark:text-white">Frontend Quiz!</span>
        </h1>
        <p className="text-preset-5 italic text-grey-500 ">Pick a subject to get started.</p>
      </div>
      <div className="flex flex-col gap-4 ">
        {quizzes.map((quiz) => {
          const quizTheme = quiz ? getTopicTheme(quiz.title) : null;
          return (
            <button
              key={quiz.title}
              onClick={() => onSelect(quiz.title)}
              className="flex items-center gap-4 w-full p-4 md:p-5 rounded-xl md:rounded-3xl bg-white dark:bg-blue-850 shadow-sm hover:ring-3 hover:ring-purple-600 transition-all group hover:cursor-pointer"
            >
              <div className={`w-10 h-10 md:w-14 md:h-14 flex items-center justify-center rounded-lg ${quizTheme?.bg}`}>
                <img
                  src={quiz.icon}
                  alt=""
                  className="w-7 h-7 md:w-10 md:h-10"
                  aria-hidden="true"
                />
              </div>

              <span className="text-preset-4 text-blue-900 dark:text-white">
                {quiz.title}
              </span>
            </button>
          );
        })}

      </div>
    </section>
  )
}

export default WelcomeScreen