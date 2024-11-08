export const getRandomHex = (): string => {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};

export const isDark = (hex: string): boolean => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  return r * 0.299 + g * 0.587 + b * 0.114 < 186;
};
