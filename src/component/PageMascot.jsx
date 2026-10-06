'use client';

import { useEffect, useRef, useState } from 'react';

// 3x3 sheet, row by row. Index 4 is the centre (looking straight).
// If the head looks the wrong way, swap the order here.
const CENTER = 4;

export default function PageMascot({ name = 'kamran', size = 140 }) {
  const ref = useRef(null);
  const [cell, setCell] = useState(CENTER);
  const [reaction, setReaction] = useState(null);
  const clicks = useRef(0);

  useEffect(() => {
    function lookAt(x, y) {
      const el = ref.current;
      if (!el) return;

      const r = el.getBoundingClientRect();
      const dx = x - (r.left + r.width / 2);
      const dy = y - (r.top + r.height / 2);
      const dist = Math.hypot(dx, dy);

      // close to the mascot: look straight ahead
      if (dist < size * 0.4) {
        setCell(CENTER);
        return;
      }

      const gx = dx / dist;
      const gy = dy / dist;
      const col = gx > 0.38 ? 2 : gx < -0.38 ? 0 : 1;
      const row = gy > 0.38 ? 2 : gy < -0.38 ? 0 : 1;
      setCell(row * 3 + col);
    }

    // desktop: mouse
    function onPointer(e) {
      lookAt(e.clientX, e.clientY);
    }

    // mobile: finger (keeps working while the page scrolls)
    function onTouch(e) {
      const t = e.touches[0];
      if (t) lookAt(t.clientX, t.clientY);
    }

    window.addEventListener('pointermove', onPointer);
    window.addEventListener('pointerdown', onPointer);
    window.addEventListener('touchstart', onTouch, { passive: true });
    window.addEventListener('touchmove', onTouch, { passive: true });

    return () => {
      window.removeEventListener('pointermove', onPointer);
      window.removeEventListener('pointerdown', onPointer);
      window.removeEventListener('touchstart', onTouch);
      window.removeEventListener('touchmove', onTouch);
    };
  }, [size]);

  function handleClick() {
    clicks.current = (clicks.current + 1) % 9;
    setReaction(clicks.current);
    setTimeout(() => setReaction(null), 500);
  }

  const showing = reaction !== null ? reaction : cell;
  const sheet = reaction !== null ? 'reactions' : 'directions';
  const col = showing % 3;
  const row = Math.floor(showing / 3);

  return (
    <div
      ref={ref}
      onClick={handleClick}
      role="img"
      aria-label="Portfolio mascot"
      className="cursor-pointer select-none"
      style={{
        width: size,
        height: size,
        backgroundImage: `url(/${name}-${sheet}.webp)`,
        backgroundSize: '300% 300%',
        backgroundPosition: `${col * 50}% ${row * 50}%`,
        backgroundRepeat: 'no-repeat',
        touchAction: 'manipulation',
      }}
    />
  );
}
