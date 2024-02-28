import { useState } from "react";

export default function useLocalStorage(key, initialValue) {
  const [storedValue, setStoreValue] = useState(() => {
    if (typeof window === "undefined") {
      return initialValue;
    }

    try {
      const item =
        typeof window !== "undefined" ? localStorage.getItem(key) : null;
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      setStoreValue(value);
      if (typeof window !== "undefined") {
        localStorage.setItem(key, JSON.stringify(value));
      }
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
}
