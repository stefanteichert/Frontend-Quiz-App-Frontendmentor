# Frontend Mentor - Frontend quiz app solution

This is my solution to the [Frontend quiz app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/frontend-quiz-app-BE7xkzXQnU). This project was a significant learning experience for me as I worked through real-world challenges around state management, accessibility, testing, and code structure. 

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [AI Collaboration](#ai-collaboration)
- [Author](#author)

## Overview

### The challenge

Users should be able to:

- Select a quiz subject
- Select a single answer from each question from a choice of four
- See an error message when trying to submit an answer without making a selection
- See if they have made a correct or incorrect choice when they submit an answer
- Move on to the next question after seeing the question result
- See a completed state with the score after the final question
- Play again to choose another subject
- View the optimal layout for the interface depending on their device's screen size
- See hover and focus states for all interactive elements on the page
- Navigate the entire app only using their keyboard
- **Bonus**: Change the app's theme between light and dark

### Screenshot

![Screenshot Light Mode](./screenshot.jpg)
![Screenshot Dark Mode](./screenshot.jpg)

---

### Links

- Solution URL: [Frontend Mentor Solution](https://your-solution-url.com)
- Live Site URL: [Live Demo](https://your-live-site-url.com)

---

## My process

### Built with

- React 19
- TypeScript
- Tailwind CSS v4
- Vite
- Vitest + React Testing Library

---

### What I learned

This project pushed me well beyond basic React and taught me concepts I had not properly understood before.

**Separation of concerns with Custom Hooks**

My first instinct was to put all logic directly into the component. After learning about Custom Hooks, I extracted all quiz logic — answer handling, score tracking, question navigation — into a `useQuiz` hook. This left `QuizScreen` as pure JSX with no logic of its own. I now understand why this separation matters: the logic is independently testable and the component is far easier to read.

```ts
const useQuiz = (activeQuiz: Quiz, onScoreUpdate: () => void, onFinish: () => void) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answerUser, setAnswerUser] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showError, setShowError] = useState(false);
  // ...returns all state and handlers
};
```

**Preventing Flash of Unstyled Content (FOUC)**

Dark mode via `localStorage` has a common problem: React applies the theme too late and causes a white flash on page load. I solved this with an inline `<script>` in `index.html` that sets the `dark` class on `<html>` before the browser paints anything — before React even loads. This was my first time writing a solution that operates outside of React entirely.

```html

  (function () {
    const saved = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (saved === 'dark' || (!saved && prefersDark)) {
      document.documentElement.classList.add('dark');
    }
  })();

```

**Accessibility beyond the basics**

Most tutorials treat accessibility as an afterthought. I wanted to do it properly.

- `role="radiogroup"` and `role="radio"` with `aria-checked` on answer buttons, so screen readers understand it is a single-choice selection rather than just a list of buttons
- `role="alert"` on the error message so screen readers interrupt and read it immediately
- `aria-label` on answer buttons that updates after submission to say "CSS – correct" or "CSS – incorrect", giving screen reader users the same feedback that sighted users get visually
- Focus management with `useRef` and `useEffect` so that when a new question loads, the screen reader focus moves to the question counter rather than staying on the previous button

```tsx
useEffect(() => {
  if (isSubmitted) {
    answersRef.current?.focus();
  } else {
    questionCountRef.current?.focus();
  }
}, [currentIndex, isSubmitted]);
```

**CSS Grid for complex layouts**

I spent a long time trying to align the progress bar with the bottom of the answer buttons using Flexbox. After many failed attempts I learned that this was fundamentally a Grid problem — I needed a two-dimensional layout where one element spans multiple rows.

```tsx

  /* Question + Progress Bar */
  /* Answer Buttons */
  /* Submit Button */

```

**Derived state vs redundant state**

My first implementation stored both a `selectedTopic` string and computed `activeQuiz` from it via `Array.find()`. I learned that this creates two sources of truth for the same information. Refactoring to store `activeQuiz` directly eliminated the redundancy and removed a potential source of bugs.

**Testing: unit tests and integration tests**

```ts
// Unit test – pure function, no React needed
it('returns green style when correct option was selected and submitted', () => {
  const option = 'CSS';
  const answerUser = 'CSS';
  const isSubmitted = true;
  const correctAnswer = 'CSS';
  expect(getButtonStyle(option, answerUser, isSubmitted, correctAnswer)).toBe('ring-3 ring-green-500');
});

// Integration test – full user flow
it('completes a full quiz and shows results', async () => {
  const user = setupUser();
  await renderAndLoad();
  await user.click(screen.getByRole('button', { name: 'HTML' }));
  await user.click(screen.getByRole('radio', { name: 'Hyper Text Markup Language' }));
  await user.click(screen.getByRole('button', { name: /submit answer/i }));
  // ...
  expect(screen.getByText('Quiz completed')).toBeInTheDocument();
});
```
One mistake I made early on was adding an artificial 1-second delay to the loading screen using `Promise.all` with a `setTimeout`. This felt like a nice UX touch at the time, but it turned out to be an anti-pattern — it made the app slower for no real reason and completely blocked my integration tests. `vi.useFakeTimers()`, `waitFor` and `act` all struggled with it in different ways. The solution was to remove it entirely and let `fetch` complete naturally. This taught me that if something is hard to test, it is often a sign that the implementation itself is wrong.


**65 tests across 8 test files — all passing.**

---

### Continued development

There are areas I identified during this project that I want to explore further:

- **`forwardRef`** — I identified that passing a `ref` to a child component requires `forwardRef`. I worked around this by placing the ref on a parent container instead, but I want to understand the pattern properly in a future project.
- **End-to-end testing** with Playwright or Cypress — my current tests run in jsdom which simulates a browser. Real browser testing would catch issues that jsdom cannot.
- **Skeleton loading** — I removed the artificial loading delay because it caused problems in tests. A proper skeleton loading UI would be a better solution and I want to implement one in a future project.

---

### AI Collaboration


I used Claude (Anthropic) throughout this project as a learning tool and code reviewer.

**What I used it for:**
- Code reviews at each stage — identifying problems I had missed such as redundant state, missing accessibility attributes, and incorrect Flexbox usage
- Learning explanations — whenever I did not understand why something was wrong, I asked for a detailed explanation rather than just accepting the fix
- Debugging test failures — particularly around `window.matchMedia` mocking and fake timer conflicts with `userEvent`
- Accessibility guidance — I learned about ARIA roles, focus management, and screen reader behavior through conversation

**What worked well:**
Claude caught issues I would not have found on my own at this stage, particularly around accessibility and the FOUC problem. The back-and-forth conversation format meant I could ask "why" after every suggestion rather than just copying code I did not understand.

**What I would do differently:**
I should have committed more frequently throughout the process. I often had large amounts of completed work in a single commit because I forgot to commit after each smaller step. This is a habit I am actively working to improve.

---

## Author

- Frontend Mentor - [@yourusername](https://www.frontendmentor.io/profile/yourusername)


---

