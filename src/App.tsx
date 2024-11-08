import { useLoaderData } from "react-router-dom";
import { insertEmptySet, loadData, WordSet } from "./lib/word";
import { useState } from "react";
import { getRandomHex, isDark } from "./lib/utils";
import cn from "@yeahx4/cn";

function App() {
  const [sets, setSets] = useState<WordSet[]>(useLoaderData() as WordSet[]);
  const [newSet, setNewSet] = useState("");

  const addSet = () => {
    if (!newSet) return;

    insertEmptySet(newSet, getRandomHex());
    setNewSet("");
    setSets(loadData());
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-3xl font-extrabold mt-16">Voca Cache</h1>

      <div className="my-16 flex justify-center w-[80%] gap-0">
        <input
          className="border px-4 py-2 w-[calc(100%-128px)]"
          placeholder="Create new corpus"
          value={newSet}
          onChange={(e) => setNewSet(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addSet()}
        />
        <button className="bg-gray-100 px-4 py-2 w-32" onClick={addSet}>
          Add Set
        </button>
      </div>

      <div className="flex flex-col gap-8 w-full items-center mt-16">
        {sets.length ? (
          sets.map((set) => (
            <div
              key={set.id}
              className={cn(
                "flex flex-col gap-4 w-[80%] max-w-5xl text-center",
                "items-center px-4 py-8 rounded-lg shadow-md",
                "hover:cursor-pointer"
              )}
              style={{
                backgroundColor: set.color,
                color: isDark(set.color) ? "white" : "black",
              }}
            >
              <h2 className="text-2xl font-bold">{set.title}</h2>
            </div>
          ))
        ) : (
          <div>No Word Sets</div>
        )}
      </div>
    </div>
  );
}

export default App;
