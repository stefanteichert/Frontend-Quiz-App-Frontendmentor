import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import WelcomeScreen from './WelcomeScreen';
import type { Quiz } from '../types';

const mockQuizzes: Quiz[] = [
  {
    title: 'HTML',
    icon: '/icon-html.svg',
    questions: [
      {
        question: 'What does HTML stand for?',
        options: ['Hyper Text Markup Language', 'High Tech Modern Language', 'Hyper Transfer Markup Language', 'Hyperlink Text Management Language'],
        answer: 'Hyper Text Markup Language'
      }
    ]
  },
  {
    title: 'CSS',
    icon: '/icon-css.svg',
    questions: [
      {
        question: 'What does CSS stand for?',
        options: ['Cascading Style Sheets', 'Creative Style Sheets', 'Computer Style Sheets', 'Colorful Style Sheets'],
        answer: 'Cascading Style Sheets'
      }
    ]
  }
];

describe('WelcomeScreen', () => {
  it('renders the welcome heading', () => {
    render(<WelcomeScreen quizzes={mockQuizzes} onSelect={vi.fn()} />);
    expect(screen.getByText('Welcome to the')).toBeInTheDocument();
    expect(screen.getByText('Frontend Quiz!')).toBeInTheDocument();
  });

  it('renders all quiz buttons', () => {
    render(<WelcomeScreen quizzes={mockQuizzes} onSelect={vi.fn()} />);
    expect(screen.getByRole('button', { name: 'HTML' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'CSS' })).toBeInTheDocument();
  });

  it('calls onSelect with correct quiz when button is clicked', async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    render(<WelcomeScreen quizzes={mockQuizzes} onSelect={onSelect} />);

    await user.click(screen.getByRole('button', { name: 'HTML' }));

    expect(onSelect).toHaveBeenCalledOnce();
    expect(onSelect).toHaveBeenCalledWith(mockQuizzes[0]);
  });

  it('renders the subtitle', () => {
    render(<WelcomeScreen quizzes={mockQuizzes} onSelect={vi.fn()} />);
    expect(screen.getByText('Pick a subject to get started.')).toBeInTheDocument();
  });
});