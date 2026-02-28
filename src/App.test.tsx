import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

const mockData = {
  quizzes: [
    {
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
          question: 'What is a tag?',
          options: [
            'A label',
            'A markup element',
            'A style',
            'A script'
          ],
          answer: 'A markup element'
        }
      ]
    }
  ]
};

const setupUser = () => userEvent.setup();

const renderAndLoad = async () => {
  render(<App />);
  await screen.findByText('Welcome to the');
};

describe('App Integration', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockData)
    }));
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('shows loading screen initially', async () => {
    render(<App />);
    const loadingDiv = document.querySelector('[aria-hidden="true"]');
    expect(loadingDiv).toBeInTheDocument();
    await screen.findByText('Welcome to the');
  });

  it('shows welcome screen after loading', async () => {
    await renderAndLoad();
    expect(screen.getByText('Welcome to the')).toBeInTheDocument();
  });

  it('shows error screen when fetch fails', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false }));
    render(<App />);
    expect(await screen.findByRole('alert')).toBeInTheDocument();
  });

  it('navigates to quiz screen after selecting a topic', async () => {
    const user = setupUser();
    await renderAndLoad();
    await user.click(screen.getByRole('button', { name: 'HTML' }));
    expect(screen.getByText('What does HTML stand for?')).toBeInTheDocument();
  });

  it('completes a full quiz and shows results', async () => {
    const user = setupUser();
    await renderAndLoad();

    await user.click(screen.getByRole('button', { name: 'HTML' }));
    await user.click(screen.getByRole('radio', { name: 'Hyper Text Markup Language' }));
    await user.click(screen.getByRole('button', { name: /submit answer/i }));
    await user.click(screen.getByRole('button', { name: /next question/i }));
    await user.click(screen.getByRole('radio', { name: 'A markup element' }));
    await user.click(screen.getByRole('button', { name: /submit answer/i }));
    await user.click(screen.getByRole('button', { name: /see results/i }));

    expect(screen.getByText('Quiz completed')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('resets to welcome screen after clicking play again', async () => {
    const user = setupUser();
    await renderAndLoad();

    await user.click(screen.getByRole('button', { name: 'HTML' }));
    await user.click(screen.getByRole('radio', { name: 'Hyper Text Markup Language' }));
    await user.click(screen.getByRole('button', { name: /submit answer/i }));
    await user.click(screen.getByRole('button', { name: /next question/i }));
    await user.click(screen.getByRole('radio', { name: 'A markup element' }));
    await user.click(screen.getByRole('button', { name: /submit answer/i }));
    await user.click(screen.getByRole('button', { name: /see results/i }));
    await user.click(screen.getByRole('button', { name: /play again/i }));

    expect(screen.getByText('Welcome to the')).toBeInTheDocument();
  });

  it('toggles dark mode', async () => {
    const user = setupUser();
    await renderAndLoad();

    const toggle = screen.getByRole('checkbox');
    expect(toggle).not.toBeChecked();
    await user.click(toggle);
    expect(toggle).toBeChecked();
    expect(localStorage.getItem('theme')).toBe('dark');
  });
});