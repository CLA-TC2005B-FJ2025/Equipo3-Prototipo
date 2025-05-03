// useCooldowns.js
import { useState, useEffect, useRef } from 'react';

const COOLDOWN_DURATION = 10; // 10 segundos

export function useCooldown() {
  const [cooldowns, setCooldowns] = useState({});
  const timersRef = useRef({});

  const isInCooldown = (idCasilla) => !!cooldowns[idCasilla];

  const setCooldown = (idCasilla) => {
    setCooldowns((prev) => ({ ...prev, [idCasilla]: true }));

    // Aquí es donde el temporizador debería eliminar el cooldown
    timersRef.current[idCasilla] = setTimeout(() => {
      setCooldowns((prev) => {
        const newCooldowns = { ...prev };
        delete newCooldowns[idCasilla];
        return newCooldowns;
      });
      delete timersRef.current[idCasilla];
    }, COOLDOWN_DURATION);
  };

  useEffect(() => {
    return () => {
      Object.values(timersRef.current).forEach(clearTimeout);
    };
  }, []);

  return { isInCooldown, setCooldown };
}
