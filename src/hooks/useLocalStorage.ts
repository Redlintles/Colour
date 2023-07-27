import { useState, useEffect } from "react";

type State<T> = [T, React.Dispatch<React.SetStateAction<T>>];

function useLocalStorage<T>(key: string, defaultValue: T): State<T> {
  const [state, setState] = useState<T>(() => {
    const parsed = localStorage.getItem(key);
    if (parsed) {
      return JSON.parse(parsed);
    } else {
      localStorage.setItem(key, JSON.stringify(defaultValue));
      return defaultValue;
    }
  });

  useEffect(() => {
    const parsed = JSON.stringify(state);
    localStorage.setItem(key, parsed);
  }, [state]);

  return [state, setState];
}

export default useLocalStorage;
