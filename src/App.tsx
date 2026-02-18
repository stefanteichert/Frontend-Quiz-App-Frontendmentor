import { useEffect, useState } from 'react'
import Header from './components/Header';

type Theme = 'light' | 'dark';

function App() {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('theme');

    if (saved === 'light' || saved === 'dark') {
      return saved;
    }

    const mql = window.matchMedia('(prefers-color-scheme: dark)');
    const hasSystemPreference = typeof mql.matches === 'boolean';

    if (hasSystemPreference && mql.matches) {
      return 'dark';
    }

    return 'light';
  });

  useEffect(() => {
    const root = window.document.documentElement;

    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-50 dark:bg-blue-900">
      <Header theme={theme} onToggle={setTheme} />


    </div>
  )
}

export default App
