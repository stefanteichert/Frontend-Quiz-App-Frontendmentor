import ThemeToggle from "./ThemeToggle"

interface HeaderProps {
  theme: 'light' | 'dark',
  onToggle: (newTheme: 'light' | 'dark') => void;
}

const Header = ({ theme, onToggle }: HeaderProps) => {
  return (
    <header className="px-6 py-4 flex flex-row justify-between min-w-full">
      <div></div>
      <ThemeToggle theme={theme} onToggle={onToggle}></ThemeToggle>
    </header>
  )
}

export default Header