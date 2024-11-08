import { decode, encode } from "./base64";
import { getUUID } from "./uuid";

export interface Word {
  id: string;
  text: string;
  meaning: string;
}

export interface WordSet {
  id: string;
  title: string;
  words: Word[];
  color: string;
}

export const loadData = (): WordSet[] => {
  const storage = localStorage.getItem("voca-cache");
  if (!storage) return [];

  return JSON.parse(decode(storage));
};

export const getRawData = (): string => {
  return localStorage.getItem("voca-cache") || "";
};

export const saveData = (data: WordSet[]): void => {
  localStorage.setItem(
    "voca-cache",
    data.length ? encode(JSON.stringify(data)) : ""
  );
};

export const insertWord = (setId: string, word: Word): WordSet[] => {
  const data = loadData();
  const set = data.find((set) => set.id === setId);
  if (!set) return data;

  set.words.push(word);
  saveData(data);
  return data;
};

export const removeWord = (setId: string, wordId: string): WordSet[] => {
  const data = loadData();
  const set = data.find((set) => set.id === setId);
  if (!set) return data;

  set.words = set.words.filter((word) => word.id !== wordId);
  saveData(data);
  return data;
};

export const insertSet = (set: WordSet): WordSet[] => {
  const data = loadData();
  data.push(set);
  saveData(data);
  return data;
};

export const removeSet = (setId: string): WordSet[] => {
  const data = loadData();
  const newData = data.filter((set) => set.id !== setId);
  saveData(newData);
  return newData;
};

export const insertEmptySet = (title: string, color: string): WordSet[] => {
  const data = loadData();
  data.push({
    id: getUUID(),
    title: title,
    words: [],
    color: color,
  });
  saveData(data);
  return data;
};

export const importFromRaw = (raw: string): WordSet[] => {
  const data = JSON.parse(decode(raw));
  saveData(data);
  return data;
};
