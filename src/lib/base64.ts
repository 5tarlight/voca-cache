export const encode = (input: string): string => {
  return btoa(encodeURIComponent(input));
};

export const decode = (input: string): string => {
  return decodeURIComponent(atob(input));
};
