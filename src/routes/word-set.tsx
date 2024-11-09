import { useParams } from "react-router-dom";
import { getSet, insertWord, removeWord } from "../lib/word";
import { useState } from "react";
import { getUUID } from "../lib/uuid";
import cn from "@yeahx4/cn";

export default function VocaSet() {
  const id = useParams().id || "";
  const [set, setSet] = useState(getSet(id));

  if (!set)
    return (
      <div className="text-center text-3xl mt-32 text-red-500 font-extrabold">
        Not found
      </div>
    );

  const [newWord, setNewWord] = useState("");
  const [newMeaning, setNewMeaning] = useState("");

  const addWord = () => {
    if (!newWord || !newMeaning) return;

    insertWord(set.id, {
      id: getUUID(),
      text: newWord,
      meaning: newMeaning,
    });
    setNewWord("");
    setNewMeaning("");
    setSet(getSet(set.id));
  };

  return (
    <div>
      <h1
        className="text-center mt-16 font-extrabold text-3xl"
        style={{
          color: set.color,
        }}
      >
        {set.title}
      </h1>

      <div className="my-16 flex justify-center gap-0 w-full">
        <input
          className="border px-4 py-2 w-[calc(50%-64px)]"
          placeholder="New word"
          value={newWord}
          onChange={(e) => setNewWord(e.target.value)}
          onKeyDown={(e) =>
            !e.nativeEvent.isComposing && e.key === "Enter" && addWord()
          }
        />
        <input
          className="border px-4 py-2 w-[calc(50%-64px)]"
          placeholder="New meaning"
          value={newMeaning}
          onChange={(e) => setNewMeaning(e.target.value)}
          onKeyDown={(e) =>
            !e.nativeEvent.isComposing && e.key === "Enter" && addWord()
          }
        />
        <button className="bg-gray-100 px-4 py-2 w-32" onClick={addWord}>
          Add Word
        </button>
      </div>

      <div className="text-center my-8">{set.words.length} words</div>

      <div className="flex flex-col items-center gap-2">
        {set.words.map((word) => (
          <div
            key={word.id}
            className={cn(
              "flex gap-4 items-center w-[80%] max-w-5xl px-4 py-2",
              "rounded-lg border-2"
            )}
          >
            <div className="w-1/2">{word.text}</div>
            <div className="w-1/2">{word.meaning}</div>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded-md"
              onClick={(e) => {
                e.preventDefault();
                removeWord(set.id, word.id);
                setSet(getSet(set.id));
              }}
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d={cn(
                    "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48",
                    "10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8",
                    "8-8 8 3.59 8 8-3.59 8-8 8zm2-11h-4v8h4v-8z"
                  )}
                ></path>
              </svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
