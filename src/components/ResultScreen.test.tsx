import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ResultScreen from './ResultScreen';
import type { Quiz } from '../types';

const mockQuiz: Quiz = {
  title: 'HTML',
  icon: '/icon-html.svg',
  questions: [
    {
      question: 'What does HTML stand for?',
      options: ['Hyper Text Markup Language', 'High Tech Modern Language', 'Hyper Transfer Markup Language', 'Hyperlink Text Management Language'],
      answer: 'Hyper Text Markup Language'
    },
    {
      question: 'What does CSS stand for?',
      options: ['Cascading Style Sheets', 'Creative Style Sheets', 'Computer Style Sheets', 'Colorful Style Sheets'],
      answer: 'Cascading Style Sheets'
    }
  ]
};

describe('ResultScreen', () => {
  it('renders the quiz completed heading', () => {
    render(<ResultScreen score={1} selectedQuiz={mockQuiz} resetQuiz={vi.fn()} />);
    expect(screen.getByText('Quiz completed')).toBeInTheDocument();
  });

  it('renders the score correctly', () => {
    render(<ResultScreen score={1} selectedQuiz={mockQuiz} resetQuiz={vi.fn()} />);
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText(`out of ${mockQuiz.questions.length}`)).toBeInTheDocument();
  });

  it('renders play again button', () => {
    render(<ResultScreen score={1} selectedQuiz={mockQuiz} resetQuiz={vi.fn()} />);
    expect(screen.getByRole('button', { name: /play again/i })).toBeInTheDocument();
  });

  it('calls resetQuiz when play again button is clicked', async () => {
    const user = userEvent.setup();
    const resetQuiz = vi.fn();
    render(<ResultScreen score={1} selectedQuiz={mockQuiz} resetQuiz={resetQuiz} />);

    await user.click(screen.getByRole('button', { name: /play again/i }));

    expect(resetQuiz).toHaveBeenCalledOnce();
  });

  it('renders correctly with score 0', () => {
    render(<ResultScreen score={0} selectedQuiz={mockQuiz} resetQuiz={vi.fn()} />);
    expect(screen.getByText('0')).toBeInTheDocument();
  });

  it('renders correctly with perfect score', () => {
    render(<ResultScreen score={2} selectedQuiz={mockQuiz} resetQuiz={vi.fn()} />);
    expect(screen.getByText('2')).toBeInTheDocument();
  });
});