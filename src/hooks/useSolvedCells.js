import { useState, useEffect, useCallback } from 'react';

/**
 * Devuelve:  solved  → Set<number>
 *            toggle  → (n) => void   (añade o quita n y persiste)
 */
export default function useSolvedCells () {
  const [solved, setSolved] = useState(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('solvedCells'));
      return new Set(Array.isArray(stored) ? stored : []);
    } catch { return new Set(); }
  });

  const toggle = useCallback(n => {
    setSolved(prev => {
      const next = new Set(prev);
      next.has(n) ? next.delete(n) : next.add(n);
      localStorage.setItem('solvedCells', JSON.stringify([...next]));
      return next;
    });
  }, []);

  return { solved, toggle };
}
