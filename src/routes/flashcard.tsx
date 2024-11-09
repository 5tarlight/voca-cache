import { useNavigate, useParams } from "react-router-dom";
import { getSet } from "../lib/word";
import { isDark } from "../lib/utils";
import { useEffect, useState } from "react";
import cn from "@yeahx4/cn";

export default function FlashCard() {
  const id = useParams().id || "";
  const random = useParams().random || "true";
  const set = getSet(id);
  const navigate = useNavigate();

  if (!set) return <div>Not found</div>;

  const [idx, setIdx] = useState(0);
  const [showMeaning, setShowMeaning] = useState(false);

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      navigate(-1);
    } else if (e.key === "ArrowRight") {
      setIdx((idx) => (idx + 1) % set.words.length);
      setShowMeaning(false);
    } else if (e.key === "ArrowLeft") {
      setIdx((idx) => (idx - 1 + set.words.length) % set.words.length);
      setShowMeaning(false);
    } else if (e.key === " ") {
      if (showMeaning) {
        setIdx((idx) => (idx + 1) % set.words.length);
        setShowMeaning(false);
      } else {
        setShowMeaning(true);
      }
    }
  };

  useEffect(() => {
    if (random === "true") {
      set.words = set.words.sort(() => Math.random() - 0.5);
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div
      className={cn(
        "w-full h-screen fixed top-0 left-0 flex",
        "items-center justify-center flex-col hover:cursor-pointer",
        "select-none"
      )}
      style={{
        backgroundColor: set.color,
        color: isDark(set.color) ? "white" : "black",
      }}
      onClick={() => {
        if (showMeaning) {
          setIdx((idx) => (idx + 1) % set.words.length);
          setShowMeaning(false);
        } else {
          setShowMeaning(true);
        }
      }}
    >
      <div className="flex -mt-16 flex-col items-center justify-center">
        <div>
          {idx + 1} / {set.words.length}
        </div>
        <div className="text-8xl font-extrabold mt-8">
          {set.words[idx].text}
        </div>
        {showMeaning && (
          <div className="text-4xl font-bold mt-8">
            {set.words[idx].meaning}
          </div>
        )}
      </div>
    </div>
  );
}
