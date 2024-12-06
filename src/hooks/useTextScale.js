// src/hooks/useTextScale.js
import { useState, useEffect } from 'react';

export const useTextScale = (ref, deps) => {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;
    const containerWidth = element.offsetWidth;
    const textWidth = element.scrollWidth;

    if (textWidth > containerWidth * 0.9) {
      setScale(Math.max((containerWidth * 0.9) / textWidth, 0.5));
    } else {
      setScale(1);
    }
  }, [ref, deps]);

  return scale;
};
