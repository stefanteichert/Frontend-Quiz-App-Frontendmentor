import { useState, useEffect } from 'react';
import Header from './components/Header';
import type { Quiz, AppStatus, Theme, DataStructure } from './types';
import WelcomeScreen from './components/WelcomeScreen';

function App() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [status, setStatus] = useState<AppStatus>('loading');
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
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

  const activeQuiz = quizzes.find(q => q.title === selectedTopic) || null;


  if (status === 'loading') {
    return (
      <div className={`${theme} min-h-screen flex justify-center items-center bg-gray-50 dark:bg-blue-900 transition-colors`}>
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-50 dark:text-slate-300 font-medium tracking-widest animate-pulse">
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
    <div className="min-h-screen flex flex-col items-center bg-gray-50 dark:bg-blue-900 animate-in fade-in duration-1000">
      <Header theme={theme} onToggle={setTheme} selectedQuiz={activeQuiz} />
      <main className="max-w-290 min-w-full px-6 py-8">
        {!selectedTopic ? (
          <div><WelcomeScreen quizzes={quizzes} onSelect={setSelectedTopic} /></div>
        ) : (
          <div>{/*  <QuizScreen /> */}</div>
        )}
      </main>


    </div>
  )
}

export default App
