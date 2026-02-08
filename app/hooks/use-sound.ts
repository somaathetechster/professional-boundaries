// app/hooks/use-sound.ts
'use client';
import { useCallback, useEffect, useRef } from 'react';

export function useSound() {
  const audioContext = useRef<AudioContext | null>(null);

  useEffect(() => {
    // Initialize AudioContext only on the client side
    // Browsers block audio until the user interacts with the page (click/type).
    const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
    if (AudioCtx) {
      audioContext.current = new AudioCtx();
    }
  }, []);

  // 1. THE RADAR BLIP (Hover)
  // High frequency, extremely short sine wave.
  // Sounds like: A digital watch beep or cursor movement.
  const playHover = useCallback(() => {
    if (!audioContext.current) return;
    
    // Resume context if suspended (browser policy)
    if (audioContext.current.state === 'suspended') {
      audioContext.current.resume().catch(() => {});
    }

    const ctx = audioContext.current;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    // Sound Design: Chirp
    osc.type = 'sine';
    // Frequency Sweep: 800Hz -> 600Hz (Subtle drop)
    osc.frequency.setValueAtTime(800, ctx.currentTime); 
    osc.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.05);

    // Envelope: Instant Attack -> Fast Decay
    gain.gain.setValueAtTime(0.02, ctx.currentTime); // Volume (Very Quiet)
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);

    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.05);
  }, []);

  // 2. THE MECHANICAL THUD (Click)
  // Low frequency square wave.
  // Sounds like: A heavy keyboard switch or relay.
  const playClick = useCallback(() => {
    if (!audioContext.current) return;

    if (audioContext.current.state === 'suspended') {
      audioContext.current.resume().catch(() => {});
    }

    const ctx = audioContext.current;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    // Sound Design: Thud
    osc.type = 'square'; // "Gritty" texture
    osc.frequency.setValueAtTime(150, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 0.1);

    // Envelope: Punchy
    gain.gain.setValueAtTime(0.05, ctx.currentTime); // Volume
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);

    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.1);
  }, []);

  return { playHover, playClick };
}