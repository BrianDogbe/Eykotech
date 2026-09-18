import { useEffect, useState } from "react";

export function WordRotator({ words, interval = 2600, className = "" }) {
  const [i, setI] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % words.length), interval);
    return () => clearInterval(t);
  }, [words, interval]);

  return (
    <span key={i} style={{ animation: "pop .45s cubic-bezier(.22,.61,.36,1) both" }} className={className}>
      {words[i]}
    </span>
  );
}