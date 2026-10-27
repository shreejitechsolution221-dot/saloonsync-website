'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Icon } from './icon';
import Image from 'next/image';

export function MotionScene({ children, className = '' }: { children?: ReactNode; className?: string }) {
  const stage = useRef<HTMLDivElement>(null);
  const frame = useRef(0);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(true);
  useEffect(() => {
    const preference = matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setReduced(preference.matches);
    sync(); preference.addEventListener('change', sync);
    return () => { preference.removeEventListener('change', sync); cancelAnimationFrame(frame.current); };
  }, []);
  const reset = () => { cancelAnimationFrame(frame.current); stage.current?.style.setProperty('--rx', '0deg'); stage.current?.style.setProperty('--ry', '0deg'); };
  return <div className={`motion-scene ${paused || reduced ? 'motion-paused' : ''} ${className}`} ref={stage} onPointerMove={event => {
    if (paused || reduced || event.pointerType !== 'mouse') return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - .5;
    const y = (event.clientY - bounds.top) / bounds.height - .5;
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => { stage.current?.style.setProperty('--rx', `${-y * 7}deg`); stage.current?.style.setProperty('--ry', `${x * 9}deg`); });
  }} onPointerLeave={reset}>
    <div className="motion-depth">{children || <div className="orbit-art" aria-hidden="true"><div className="orbit-ring ring-one" /><div className="orbit-ring ring-two" /><div className="orbit-core"><Image src="/saloonsync-logo.png" alt="" width={88} height={88} sizes="88px" /><span>Saloonsync</span></div><div className="orbit-chip chip-one"><Icon name="calendar" />Appointments</div><div className="orbit-chip chip-two"><Icon name="people" />Your people</div><div className="orbit-chip chip-three"><Icon name="box" />Every detail</div></div>}</div>
    {!reduced && <button className="motion-toggle" aria-pressed={paused} onClick={() => { setPaused(!paused); reset(); }}>{paused ? 'Enable motion' : 'Pause motion'}<span aria-hidden="true">{paused ? '▷' : 'Ⅱ'}</span></button>}
  </div>;
}

