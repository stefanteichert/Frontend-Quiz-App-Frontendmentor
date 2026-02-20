import type { Quiz } from "../types";
import { getTopicTheme } from "../constants/quizTheme";

interface WelcomeScreenProps {
  quizzes: Quiz[];
  onSelect: (quizTitle: string) => void;
}



const WelcomeScreen = ({ quizzes, onSelect }: WelcomeScreenProps) => {
  return (
    <section className="flex flex-col gap-10 desktop:flex-row desktop:gap-32">
      <div className="w-full flex flex-col gap-4 desktop:gap-12 desktop:max-w-116.25  desktop:pb-4">
        <h1 className="flex flex-col gap-2">
          <span className="text-preset-2-light text-blue-900 dark:text-white">Welcome to the</span>
          <span className="text-preset-2-medium text-blue-900 dark:text-white">Frontend Quiz!</span>
        </h1>
        <p className="text-preset-5 italic text-grey-500 ">Pick a subject to get started.</p>
      </div>
      <div className="flex flex-col gap-4 desktop:flex-1">
        {quizzes.map((quiz) => {
          const quizTheme = quiz ? getTopicTheme(quiz.title) : null;
          return (
            <button
              key={quiz.title}
              onClick={() => onSelect(quiz.title)}
              className="flex items-center gap-4 w-full p-4  rounded-xl tablet:rounded-3xl bg-white dark:bg-blue-850 shadow-sm hover:ring-3 hover:ring-purple-600 transition-all group hover:cursor-pointer "
            >
              <div className={`min-w-10 min-h-10 flex items-center justify-center rounded-lg ${quizTheme?.bg}`}>
                <img
                  src={quiz.icon}
                  alt=""
                  className="min-w-7 min-h-7 "
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