import { SunIcon } from '../components/icons/SunIcon';
import { MoonIcon } from '../components/icons/MoonIcon';

interface ThemeToggleProps {
  theme: 'light' | 'dark',
  onToggle: (newTheme: 'light' | 'dark') => void;
}

const ThemeToggle = ({ theme, onToggle }: ThemeToggleProps) => {
  return (

    <label htmlFor="theme-switch" className="flex items-center gap-2 tablet:gap-4 cursor-pointer">

      <SunIcon className="text-gray-500 w-3.5 h-3.5 tablet:w-5.25 tablet:h-5.25 dark:text-white transition-colors" />

      <div className="relative min-w-8 min-h-5 tablet:w-12 tablet:h-7">
        <input
          id="theme-switch"
          type="checkbox"
          className="peer sr-only"
          checked={theme === 'dark'}
          onChange={(e) => onToggle(e.target.checked ? 'dark' : 'light')}
          aria-label="toggle dark mode"
        />

        {/* Track */}
        <div className="absolute inset-0 rounded-full bg-purple-600 transition-colors duration-300 p-1" />

        {/* Thumb */}
        <div className="absolute left-1 top-1 w-3 h-3 tablet:w-5 tablet:h-5 bg-white rounded-full transition-all duration-300 peer-checked:translate-x-3 tablet:peer-checked:translate-x-5" />
      </div>
      <MoonIcon className="text-gray-500 w-3.5 h-3.5 tablet:w-4.5 tablet:h-4.5 dark:text-white transition-colors" />
    </label>
  )
}

export default ThemeToggle