import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AnswerOption from './AnswerOption';

describe('AnswerOption', () => {
  const defaultProps = {
    option: 'CSS',
    index: 0,
    answerUser: null,
    isSubmitted: false,
    correctAnswer: 'HTML',
    onAnswer: vi.fn(),
  };

  it('renders the option text', () => {
    render(<AnswerOption {...defaultProps} />);
    expect(screen.getByText('CSS')).toBeInTheDocument();
  });

  it('renders the correct letter based on index', () => {
    render(<AnswerOption {...defaultProps} />);
    expect(screen.getByText('A')).toBeInTheDocument();
  });

  it('renders B for index 1', () => {
    render(<AnswerOption {...defaultProps} index={1} />);
    expect(screen.getByText('B')).toBeInTheDocument();
  });

  it('calls onAnswer with option when clicked', async () => {
    const user = userEvent.setup();
    const onAnswer = vi.fn();
    render(<AnswerOption {...defaultProps} onAnswer={onAnswer} />);

    await user.click(screen.getByRole('radio'));

    expect(onAnswer).toHaveBeenCalledOnce();
    expect(onAnswer).toHaveBeenCalledWith('CSS');
  });

  it('does not call onAnswer when submitted', async () => {
    const user = userEvent.setup();
    const onAnswer = vi.fn();
    render(<AnswerOption {...defaultProps} isSubmitted={true} onAnswer={onAnswer} />);

    await user.click(screen.getByRole('radio'));

    expect(onAnswer).not.toHaveBeenCalled();
  });

  it('is not checked when not selected', () => {
    render(<AnswerOption {...defaultProps} />);
    expect(screen.getByRole('radio')).not.toBeChecked();
  });

  it('is checked when selected', () => {
    render(<AnswerOption {...defaultProps} answerUser="CSS" />);
    expect(screen.getByRole('radio')).toBeChecked();
  });

  it('shows correct icon after submit when option is correct answer', () => {
    render(<AnswerOption {...defaultProps} option="HTML" correctAnswer="HTML" isSubmitted={true} answerUser="CSS" />);
    expect(screen.getByAltText('correct')).toBeInTheDocument();
  });

  it('shows incorrect icon after submit when option is wrong answer selected by user', () => {
    render(<AnswerOption {...defaultProps} option="CSS" correctAnswer="HTML" isSubmitted={true} answerUser="CSS" />);
    expect(screen.getByAltText('incorrect')).toBeInTheDocument();
  });

  it('has correct aria-label before submit', () => {
    render(<AnswerOption {...defaultProps} />);
    expect(screen.getByRole('radio')).toHaveAttribute('aria-label', 'CSS');
  });

  it('has correct aria-label after submit when correct', () => {
    render(<AnswerOption {...defaultProps} option="HTML" correctAnswer="HTML" isSubmitted={true} answerUser="CSS" />);
    expect(screen.getByRole('radio')).toHaveAttribute('aria-label', 'HTML – correct');
  });

  it('has correct aria-label after submit when incorrect', () => {
    render(<AnswerOption {...defaultProps} option="CSS" correctAnswer="HTML" isSubmitted={true} answerUser="CSS" />);
    expect(screen.getByRole('radio')).toHaveAttribute('aria-label', 'CSS – incorrect');
  });
});