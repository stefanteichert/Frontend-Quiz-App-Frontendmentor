export const TOPIC_THEMES = {
  HTML: { bg: "bg-orange-50" },
  CSS: { bg: "bg-green-100" },
  JavaScript: { bg: "bg-blue-50" },
  Accessibility: { bg: "bg-purple-100" },
} as const;

export type TopicTitle = keyof typeof TOPIC_THEMES;

export const getTopicTheme = (title: string) => {

  const theme = TOPIC_THEMES[title as TopicTitle];

  return theme || { bg: "bg-slate-100" };
};