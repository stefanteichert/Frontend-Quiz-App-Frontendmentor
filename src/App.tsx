import { useState, useEffect } from 'react';
import Header from './components/Header';
import type { Quiz, AppStatus, Theme, DataStructure } from './types';
import WelcomeScreen from './components/WelcomeScreen';
import QuizScreen from './components/QuizScreen';
import ResultScreen from './components/ResultScreen';

function App() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [status, setStatus] = useState<AppStatus>('loading');
  const [activeQuiz, setActiveQuiz] = useState<Quiz | null>(null);
  const [score, setScore] = useState(0);
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('theme');
    if (saved === 'light' || saved === 'dark') return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        const fetchPromise = fetch('/data.json').then(res => {
          if (!res.ok) throw new Error();
          return res.json();
        });

        const timerPromise = new Promise(resolve => setTimeout(resolve, 1000));
        const [data] = await Promise.all([fetchPromise, timerPromise]);

        const typedData = data as DataStructure;
        setQuizzes(typedData.quizzes);
        setStatus('ready');
      } catch (error) {
        setStatus('error');
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  const handleSelectQuiz = (quiz: Quiz) => {
    setActiveQuiz(quiz);
    setScore(0);
  };

  const handleFinish = () => {
    setStatus('results');
  };

  const resetQuiz = () => {
    setStatus('ready');
    setActiveQuiz(null);
    setScore(0);
  };

  if (status === 'loading') {
    return (
      <div className=" min-h-screen flex justify-center items-center bg-gray-50 dark:bg-blue-900 transition-colors" aria-hidden="true">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-blue-900 dark:text-grey-50 font-medium tracking-widest animate-pulse">
            LOADING QUIZ...
          </p>
        </div>
      </div>
    );
  }

  if (status === 'error') {
    return <div role="alert" className="p-10 text-red-500 text-center">No Data found. Please check data.json.</div>;
  }

  return (
    <div className="app-background min-h-screen flex flex-col bg-gray-50 dark:bg-blue-900 animate-in fade-in duration-1000">
      <div className="w-full min-w-81.75 tablet:max-w-160 desktop:max-w-290 mx-auto flex flex-col pt-6 px-6 tablet:pt-8 ">
        <Header theme={theme} onToggle={setTheme} selectedQuiz={activeQuiz} />
        <main className="mt-8 tablet:mt-10 desktop:mt-24.75" aria-label="Quiz app">
          {status === 'results' ? (
            <ResultScreen score={score} selectedQuiz={activeQuiz} resetQuiz={resetQuiz} />
          ) : !activeQuiz ? (
            <WelcomeScreen quizzes={quizzes} onSelect={handleSelectQuiz} />
          ) : (
            <QuizScreen
              activeQuiz={activeQuiz}
              onScoreUpdate={() => setScore(prev => prev + 1)}
              onFinish={handleFinish}
            />
          )}
        </main>
      </div>
    </div>
  );
}

export default App;