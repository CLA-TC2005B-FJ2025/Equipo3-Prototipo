import { useState, useEffect } from 'react';

const COOLDOWN_DURATION = 60000; // 1 minuto

export function useCooldown() {
  const [cooldowns, setCooldowns] = useState(() => {
    const stored = JSON.parse(localStorage.getItem('cooldowns') || '{}');
    const now = Date.now();
    const filtered = Object.fromEntries(
      Object.entries(stored).filter(([_, time]) => now < time)
    );
    return filtered;
  });

  const isInCooldown = (idCasilla) => {
    const endTime = cooldowns[idCasilla];
    return endTime && Date.now() < endTime;
  };

  const setCooldown = (idCasilla) => {
    const endTime = Date.now() + COOLDOWN_DURATION;
    const updated = { ...cooldowns, [idCasilla]: endTime };
    setCooldowns(updated);
    localStorage.setItem('cooldowns', JSON.stringify(updated));
    console.log(`⏳ Casilla ${idCasilla} cooldown hasta ${new Date(endTime).toLocaleTimeString()}`);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      const filtered = Object.fromEntries(
        Object.entries(cooldowns).filter(([_, time]) => now < time)
      );
      if (Object.keys(filtered).length !== Object.keys(cooldowns).length) {
        setCooldowns(filtered);
        localStorage.setItem('cooldowns', JSON.stringify(filtered));
      }
    }, 1000); // revisar cada segundo

    return () => clearInterval(interval);
  }, [cooldowns]);

  return { isInCooldown, setCooldown };
}
