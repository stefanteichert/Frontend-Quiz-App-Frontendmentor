import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import QuizScreen from './QuizScreen';
import type { Quiz } from '../types';

const mockQuiz: Quiz = {
  title: 'HTML',
  icon: '/icon-html.svg',
  questions: [
    {
      question: 'What does HTML stand for?',
      options: [
        'Hyper Text Markup Language',
        'High Tech Modern Language',
        'Hyper Transfer Markup Language',
        'Hyperlink Text Management Language'
      ],
      answer: 'Hyper Text Markup Language'
    },
    {
      question: 'What does CSS stand for?',
      options: [
        'Cascading Style Sheets',
        'Creative Style Sheets',
        'Computer Style Sheets',
        'Colorful Style Sheets'
      ],
      answer: 'Cascading Style Sheets'
    }
  ]
};

describe('QuizScreen', () => {
  it('renders the first question', () => {
    render(<QuizScreen activeQuiz={mockQuiz} onScoreUpdate={vi.fn()} onFinish={vi.fn()} />);
    expect(screen.getByText('What does HTML stand for?')).toBeInTheDocument();
  });

  it('renders question counter', () => {
    render(<QuizScreen activeQuiz={mockQuiz} onScoreUpdate={vi.fn()} onFinish={vi.fn()} />);
    expect(screen.getByText('Question 1 of 2')).toBeInTheDocument();
  });

  it('renders all answer options', () => {
    render(<QuizScreen activeQuiz={mockQuiz} onScoreUpdate={vi.fn()} onFinish={vi.fn()} />);
    expect(screen.getByText('Hyper Text Markup Language')).toBeInTheDocument();
    expect(screen.getByText('High Tech Modern Language')).toBeInTheDocument();
    expect(screen.getByText('Hyper Transfer Markup Language')).toBeInTheDocument();
    expect(screen.getByText('Hyperlink Text Management Language')).toBeInTheDocument();
  });

  it('renders submit button initially', () => {
    render(<QuizScreen activeQuiz={mockQuiz} onScoreUpdate={vi.fn()} onFinish={vi.fn()} />);
    expect(screen.getByRole('button', { name: /submit answer/i })).toBeInTheDocument();
  });

  it('shows error message when submitting without selecting an answer', async () => {
    const user = userEvent.setup();
    render(<QuizScreen activeQuiz={mockQuiz} onScoreUpdate={vi.fn()} onFinish={vi.fn()} />);

    await user.click(screen.getByRole('button', { name: /submit answer/i }));

    expect(screen.getByText('Please select an answer')).toBeInTheDocument();
  });

  it('hides error message when an answer is selected after error', async () => {
    const user = userEvent.setup();
    render(<QuizScreen activeQuiz={mockQuiz} onScoreUpdate={vi.fn()} onFinish={vi.fn()} />);

    await user.click(screen.getByRole('button', { name: /submit answer/i }));
    expect(screen.getByText('Please select an answer')).toBeInTheDocument();

    await user.click(screen.getByRole('radio', { name: 'Hyper Text Markup Language' }));
    expect(screen.queryByText('Please select an answer')).not.toBeInTheDocument();
  });

  it('shows next question button after submitting', async () => {
    const user = userEvent.setup();
    render(<QuizScreen activeQuiz={mockQuiz} onScoreUpdate={vi.fn()} onFinish={vi.fn()} />);

    await user.click(screen.getByRole('radio', { name: 'Hyper Text Markup Language' }));
    await user.click(screen.getByRole('button', { name: /submit answer/i }));

    expect(screen.getByRole('button', { name: /next question/i })).toBeInTheDocument();
  });

  it('calls onScoreUpdate when correct answer is submitted', async () => {
    const user = userEvent.setup();
    const onScoreUpdate = vi.fn();
    render(<QuizScreen activeQuiz={mockQuiz} onScoreUpdate={onScoreUpdate} onFinish={vi.fn()} />);

    await user.click(screen.getByRole('radio', { name: 'Hyper Text Markup Language' }));
    await user.click(screen.getByRole('button', { name: /submit answer/i }));

    expect(onScoreUpdate).toHaveBeenCalledOnce();
  });

  it('does not call onScoreUpdate when wrong answer is submitted', async () => {
    const user = userEvent.setup();
    const onScoreUpdate = vi.fn();
    render(<QuizScreen activeQuiz={mockQuiz} onScoreUpdate={onScoreUpdate} onFinish={vi.fn()} />);

    await user.click(screen.getByRole('radio', { name: 'High Tech Modern Language' }));
    await user.click(screen.getByRole('button', { name: /submit answer/i }));

    expect(onScoreUpdate).not.toHaveBeenCalled();
  });

  it('advances to next question after clicking next', async () => {
    const user = userEvent.setup();
    render(<QuizScreen activeQuiz={mockQuiz} onScoreUpdate={vi.fn()} onFinish={vi.fn()} />);

    await user.click(screen.getByRole('radio', { name: 'Hyper Text Markup Language' }));
    await user.click(screen.getByRole('button', { name: /submit answer/i }));
    await user.click(screen.getByRole('button', { name: /next question/i }));

    expect(screen.getByText('What does CSS stand for?')).toBeInTheDocument();
    expect(screen.getByText('Question 2 of 2')).toBeInTheDocument();
  });

  it('shows see results button on last question', async () => {
    const user = userEvent.setup();
    render(<QuizScreen activeQuiz={mockQuiz} onScoreUpdate={vi.fn()} onFinish={vi.fn()} />);

    await user.click(screen.getByRole('radio', { name: 'Hyper Text Markup Language' }));
    await user.click(screen.getByRole('button', { name: /submit answer/i }));
    await user.click(screen.getByRole('button', { name: /next question/i }));
    await user.click(screen.getByRole('radio', { name: 'Cascading Style Sheets' }));
    await user.click(screen.getByRole('button', { name: /submit answer/i }));

    expect(screen.getByRole('button', { name: /see results/i })).toBeInTheDocument();
  });

  it('calls onFinish when see results is clicked', async () => {
    const user = userEvent.setup();
    const onFinish = vi.fn();
    render(<QuizScreen activeQuiz={mockQuiz} onScoreUpdate={vi.fn()} onFinish={onFinish} />);

    await user.click(screen.getByRole('radio', { name: 'Hyper Text Markup Language' }));
    await user.click(screen.getByRole('button', { name: /submit answer/i }));
    await user.click(screen.getByRole('button', { name: /next question/i }));
    await user.click(screen.getByRole('radio', { name: 'Cascading Style Sheets' }));
    await user.click(screen.getByRole('button', { name: /submit answer/i }));
    await user.click(screen.getByRole('button', { name: /see results/i }));

    expect(onFinish).toHaveBeenCalledOnce();
  });
});