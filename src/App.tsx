import { useLoaderData, useNavigate } from "react-router-dom";
import {
  clearData,
  getRawData,
  insertEmptySet,
  loadData,
  saveData,
  WordSet,
} from "./lib/word";
import { useState } from "react";
import { copyToClipboard, getRandomHex, isDark } from "./lib/utils";
import cn from "@yeahx4/cn";
import { decode } from "./lib/base64";

function App() {
  const navigate = useNavigate();

  const [sets, setSets] = useState<WordSet[]>(useLoaderData() as WordSet[]);
  const [newSet, setNewSet] = useState("");
  const [importInput, setImportInput] = useState("");

  const addSet = () => {
    if (!newSet) return;

    insertEmptySet(newSet, getRandomHex());
    setNewSet("");
    setSets(loadData());
  };

  const importRaw = () => {
    if (!importInput) return;

    const really = confirm(
      "Are you sure? This will overwrite the current data"
    );
    if (!really) return;

    try {
      const data = JSON.parse(decode(importInput));
      if (!Array.isArray(data)) throw new Error("Invalid data");

      saveData(data);
      setSets(data);
      setImportInput("");
    } catch (e) {
      alert("Invalid data");
    }
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
          onKeyDown={(e) =>
            !e.nativeEvent.isComposing && e.key === "Enter" && addSet()
          }
        />
        <button className="bg-gray-100 px-4 py-2 w-32" onClick={addSet}>
          Add Set
        </button>
      </div>

      <div className="flex justify-between w-full h-16">
        <button
          className="w-1/2 bg-red-500 text-white text-lg rounded-l-md"
          onClick={() => {
            const really = confirm("Are you sure?");
            if (!really) return;
            clearData();
            setSets([]);
          }}
        >
          Clear word set
        </button>
        <button
          className="w-1/2 bg-green-500 text-white text-lg rounded-r-md"
          onClick={() => {
            const raw = getRawData();
            copyToClipboard(raw);
            alert("Copied to clipboard!");
          }}
        >
          Export to clipboard
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
              onClick={() => navigate(`/set/${set.id}`)}
            >
              <h2 className="text-2xl font-bold">{set.title}</h2>
            </div>
          ))
        ) : (
          <div>No Word Sets</div>
        )}
      </div>

      <div className="my-16 flex justify-center w-[80%] gap-0">
        <input
          className="border px-4 py-2 w-[calc(100%-128px)]"
          placeholder="Import from clipboard"
          value={importInput}
          onChange={(e) => setImportInput(e.target.value)}
          onKeyDown={(e) =>
            !e.nativeEvent.isComposing && e.key === "Enter" && importRaw()
          }
        />
        <button className="bg-gray-100 px-4 py-2 w-32" onClick={importRaw}>
          Import
        </button>
      </div>
    </div>
  );
}

export default App;
