import { describe, it, expect } from 'vitest';
import { getTopicTheme } from './quizTheme';

describe('getTopicTheme', () => {
  it('returns correct theme for HTML', () => {
    expect(getTopicTheme('HTML')).toEqual({ bg: 'bg-orange-50' });
  });

  it('returns correct theme for CSS', () => {
    expect(getTopicTheme('CSS')).toEqual({ bg: 'bg-green-100' });
  });

  it('returns correct theme for JavaScript', () => {
    expect(getTopicTheme('JavaScript')).toEqual({ bg: 'bg-blue-50' });
  });

  it('returns correct theme for Accessibility', () => {
    expect(getTopicTheme('Accessibility')).toEqual({ bg: 'bg-purple-100' });
  });

  it('returns fallback theme for unknown topic', () => {
    expect(getTopicTheme('Unknown')).toEqual({ bg: 'bg-slate-100' });
  });
});