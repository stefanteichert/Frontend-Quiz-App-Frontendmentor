import { describe, it, expect } from 'vitest';
import { getButtonStyle, getLetterStyle } from './quizStyles';

describe('getButtonStyle', () => {
  it('returns hover style when not submitted and option is not selected', () => {
    const option = 'HTML';
    const answerUser = null;
    const isSubmitted = false;
    const correctAnswer = 'CSS';

    expect(getButtonStyle(option, answerUser, isSubmitted, correctAnswer)).toBe('hover:ring-3 hover:ring-purple-600');
  });

  it('returns selected style when option is selected and not submitted', () => {
    const option = 'HTML';
    const answerUser = 'HTML';
    const isSubmitted = false;
    const correctAnswer = 'CSS';

    expect(getButtonStyle(option, answerUser, isSubmitted, correctAnswer)).toBe('ring-3 ring-purple-600');
  });

  it('returns green style when option is correct answer after submit', () => {
    const option = 'CSS';
    const answerUser = 'HTML';
    const isSubmitted = true;
    const correctAnswer = 'CSS';

    expect(getButtonStyle(option, answerUser, isSubmitted, correctAnswer)).toBe('ring-3 ring-green-500');
  });

  it('returns red style when option is wrong answer after submit', () => {
    const option = 'HTML';
    const answerUser = 'HTML';
    const isSubmitted = true;
    const correctAnswer = 'CSS';

    expect(getButtonStyle(option, answerUser, isSubmitted, correctAnswer)).toBe('ring-3 ring-red-500');
  });

  it('returns empty string for unselected wrong option after submit', () => {
    const option = 'JavaScript';
    const answerUser = 'HTML';
    const isSubmitted = true;
    const correctAnswer = 'CSS';

    expect(getButtonStyle(option, answerUser, isSubmitted, correctAnswer)).toBe('');
  });

  it('returns green style when correct option was selected and submitted', () => {
    const option = 'CSS';
    const answerUser = 'CSS';
    const isSubmitted = true;
    const correctAnswer = 'CSS';

    expect(getButtonStyle(option, answerUser, isSubmitted, correctAnswer)).toBe('ring-3 ring-green-500');
  });

});

describe('getLetterStyle', () => {
  it('returns default style when not submitted and option is not selected', () => {
    const option = 'HTML';
    const answerUser = null;
    const isSubmitted = false;
    const correctAnswer = 'CSS';

    expect(getLetterStyle(option, answerUser, isSubmitted, correctAnswer)).toBe('bg-grey-50 text-grey-500');
  });

  it('returns purple style when option is selected and not submitted', () => {
    const option = 'HTML';
    const answerUser = 'HTML';
    const isSubmitted = false;
    const correctAnswer = 'CSS';

    expect(getLetterStyle(option, answerUser, isSubmitted, correctAnswer)).toBe('bg-purple-600 text-white');
  });

  it('returns green style when option is correct answer after submit', () => {
    const option = 'CSS';
    const answerUser = 'HTML';
    const isSubmitted = true;
    const correctAnswer = 'CSS';

    expect(getLetterStyle(option, answerUser, isSubmitted, correctAnswer)).toBe('bg-green-500 text-white');
  });

  it('returns red style when option is wrong answer after submit', () => {
    const option = 'HTML';
    const answerUser = 'HTML';
    const isSubmitted = true;
    const correctAnswer = 'CSS';

    expect(getLetterStyle(option, answerUser, isSubmitted, correctAnswer)).toBe('bg-red-500 text-white');
  });

  it('returns default style for unselected wrong option after submit', () => {
    const option = 'JavaScript';
    const answerUser = 'HTML';
    const isSubmitted = true;
    const correctAnswer = 'CSS';

    expect(getLetterStyle(option, answerUser, isSubmitted, correctAnswer)).toBe('bg-grey-50 text-grey-500');
  });

  it('returns green style when correct option was selected and submitted', () => {
    const option = 'CSS';
    const answerUser = 'CSS';
    const isSubmitted = true;
    const correctAnswer = 'CSS';

    expect(getLetterStyle(option, answerUser, isSubmitted, correctAnswer)).toBe('bg-green-500 text-white');
  });


});