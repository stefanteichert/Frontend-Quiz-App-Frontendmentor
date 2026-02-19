import ThemeToggle from "./ThemeToggle"
import type { Theme, Quiz } from "../types";
import { getTopicTheme } from "../constants/quizTheme";

interface HeaderProps {
  selectedQuiz: Quiz | null
  theme: Theme,
  onToggle: (newTheme: Theme) => void;
}


const Header = ({ selectedQuiz, theme, onToggle }: HeaderProps) => {
  const quizTheme = selectedQuiz ? getTopicTheme(selectedQuiz.title) : null;

  return (
    <header className="flex items-center justify-between px-6 py-4 md:p-10 lg:px-0 lg:py-12 max-w-290 mx-auto w-full">
      <div className="flex items-center gap-4">
        {selectedQuiz && (
          <>
            <div className={`p-2 rounded-lg ${quizTheme?.bg}`}>
              <img src={selectedQuiz.icon} alt="" className="w-5.5 h-6.25" aria-hidden="true" />
            </div>
            <span className="text-preset-4 text-blue-900 dark:text-white">
              {selectedQuiz.title}
            </span>
          </>
        )}
      </div>

      <ThemeToggle theme={theme} onToggle={onToggle} />
    </header>
  )
}

export default Header