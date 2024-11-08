export const encode = (input: string): string => {
  return btoa(input);
};

export const decode = (input: string): string => {
  return atob(input);
};
