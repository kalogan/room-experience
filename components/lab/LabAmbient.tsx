"use client";

import { useEffect, useRef } from "react";
import { useLabStore } from "@/store/labStore";

// Generates subtle brown noise via Web Audio API — no external files needed.
// AudioContext is created only after the user first enables sound, which
// satisfies browser autoplay policy (requires a user gesture).

export function LabAmbient() {
  const soundEnabled = useLabStore((s) => s.soundEnabled);
  const ctxRef  = useRef<AudioContext | null>(null);
  const gainRef = useRef<GainNode | null>(null);

  useEffect(() => {
    if (soundEnabled && !ctxRef.current) {
      const ctx = new AudioContext();
      ctxRef.current = ctx;

      // Brown noise: white noise passed through a leaky integrator.
      // 4-second looping buffer keeps memory use minimal.
      const bufferSize = ctx.sampleRate * 4;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      let last = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        last = (last + 0.02 * white) / 1.02;
        data[i] = last * 3.5;
      }

      const source = ctx.createBufferSource();
      source.buffer = buffer;
      source.loop = true;

      const gain = ctx.createGain();
      gain.gain.value = 0;
      gainRef.current = gain;

      source.connect(gain);
      gain.connect(ctx.destination);
      source.start();
    }

    const gain = gainRef.current;
    const ctx  = ctxRef.current;
    if (gain && ctx) {
      gain.gain.setTargetAtTime(
        soundEnabled ? 0.018 : 0,
        ctx.currentTime,
        0.8  // 800 ms fade in/out
      );
    }
  }, [soundEnabled]);

  // Close AudioContext on unmount to release system audio resources.
  useEffect(() => {
    return () => { ctxRef.current?.close(); };
  }, []);

  return null;
}
