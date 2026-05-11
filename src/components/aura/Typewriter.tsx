import { useEffect, useState } from "react";

interface TypewriterProps {
  words: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pause?: number;
  className?: string;
}

const Typewriter = ({
  words,
  typingSpeed = 90,
  deletingSpeed = 45,
  pause = 1600,
  className = "",
}: TypewriterProps) => {
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState("");
  const [phase, setPhase] = useState<"typing" | "pausing" | "deleting">("typing");

  useEffect(() => {
    const current = words[wordIndex % words.length];
    let timer: number;

    if (phase === "typing") {
      if (text.length < current.length) {
        timer = window.setTimeout(
          () => setText(current.slice(0, text.length + 1)),
          typingSpeed,
        );
      } else {
        timer = window.setTimeout(() => setPhase("deleting"), pause);
      }
    } else if (phase === "deleting") {
      if (text.length > 0) {
        timer = window.setTimeout(
          () => setText(current.slice(0, text.length - 1)),
          deletingSpeed,
        );
      } else {
        setWordIndex((i) => (i + 1) % words.length);
        setPhase("typing");
      }
    }
    return () => window.clearTimeout(timer);
  }, [text, phase, wordIndex, words, typingSpeed, deletingSpeed, pause]);

  return (
    <span className={className}>
      {text}
      <span className="type-caret" aria-hidden="true" />
    </span>
  );
};

export default Typewriter;
