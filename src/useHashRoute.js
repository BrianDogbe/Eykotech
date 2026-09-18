import { useEffect, useState } from "react";

function parse() {
  const h = window.location.hash;
  return h.startsWith("#/") ? h.slice(1) : "";
}

export function useHashRoute() {
  const [route, setRoute] = useState(parse);

  useEffect(() => {
    const onChange = () => setRoute(parse());
    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
  }, []);

  return route;
}

export function go(path) {
  if (path) {
    window.location.hash = path;
  } else {
    history.replaceState(null, "", window.location.pathname + window.location.search);
  }
  window.scrollTo({ top: 0, behavior: "instant" });
}