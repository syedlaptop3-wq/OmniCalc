import { useState, useEffect, Dispatch, SetStateAction } from 'react';

export function usePersistentState<T>(key: string, initialValue: T): [T, Dispatch<SetStateAction<T>>] {
  // Use a namespace prefix to avoid collisions
  const STORAGE_KEY = `omnicalc_${key}`;

  const [state, setState] = useState<T>(() => {
    try {
      const storedValue = localStorage.getItem(STORAGE_KEY);
      if (storedValue !== null) {
        return JSON.parse(storedValue);
      }
    } catch (error) {
      console.warn(`Error reading localStorage key "${STORAGE_KEY}":`, error);
    }
    return initialValue;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (error) {
      console.warn(`Error saving to localStorage key "${STORAGE_KEY}":`, error);
    }
  }, [STORAGE_KEY, state]);

  return [state, setState];
}