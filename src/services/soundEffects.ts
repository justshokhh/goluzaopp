/**
 * UzScore — Web Audio API Ovoz Generator (Zero Dependency)
 * Hech qanday tashqi mp3/wav fayllarga tayanmasdan, brauzerning
 * o'zidagi AudioContext orqali toza, studiya darajasidagi stadion signali va gol jingle hosil qiladi.
 */

class SoundEffectsManager {
  private ctx: AudioContext | null = null;
  private soundEnabled: boolean = true;

  constructor() {
    if (typeof window !== 'undefined') {
      try {
        const saved = window.localStorage.getItem('uzscore_sound_enabled');
        this.soundEnabled = saved !== 'false';
      } catch {
        this.soundEnabled = true;
      }
    }
  }

  public isEnabled(): boolean {
    return this.soundEnabled;
  }

  public toggle(): boolean {
    this.soundEnabled = !this.soundEnabled;
    if (typeof window !== 'undefined') {
      try {
        window.localStorage.setItem('uzscore_sound_enabled', String(this.soundEnabled));
      } catch {
        // storage ignored
      }
    }
    return this.soundEnabled;
  }

  public setEnabled(val: boolean): void {
    this.soundEnabled = val;
    if (typeof window !== 'undefined') {
      try {
        window.localStorage.setItem('uzscore_sound_enabled', String(val));
      } catch {
        // storage ignored
      }
    }
  }

  private getContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    try {
      const AudioContextClass =
        window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioContextClass) return null;

      if (!this.ctx) {
        this.ctx = new AudioContextClass();
      }
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
      return this.ctx;
    } catch {
      return null;
    }
  }

  /**
   * SofaScore uslubidagi 3 tonli quvonchli stadion jingle (C5 -> E5 -> G5)
   */
  public playGoalChime(): void {
    if (!this.soundEnabled) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;

      // 1-nota: C5 (523.25 Hz)
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(523.25, now);
      gain1.gain.setValueAtTime(0.18, now);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      osc1.start(now);
      osc1.stop(now + 0.25);

      // 2-nota: E5 (659.25 Hz)
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(659.25, now + 0.12);
      gain2.gain.setValueAtTime(0.2, now + 0.12);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      osc2.start(now + 0.12);
      osc2.stop(now + 0.4);

      // 3-nota: G5 (783.99 Hz) — uzoqroq jaranglaydi
      const osc3 = ctx.createOscillator();
      const gain3 = ctx.createGain();
      osc3.type = 'triangle';
      osc3.frequency.setValueAtTime(783.99, now + 0.24);
      gain3.gain.setValueAtTime(0.25, now + 0.24);
      gain3.gain.exponentialRampToValueAtTime(0.001, now + 0.75);
      osc3.connect(gain3);
      gain3.connect(ctx.destination);
      osc3.start(now + 0.24);
      osc3.stop(now + 0.75);
    } catch {
      // Audio autoplay cheklovi bo'lsa xatosiz to'xtaydi
    }
  }

  /**
   * Qisqa hakam hushtagi ohangi (o'yin yakunlanganda yoki muhim hodisada)
   */
  public playWhistle(): void {
    if (!this.soundEnabled) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(2600, now);
      osc.frequency.linearRampToValueAtTime(3200, now + 0.08);
      osc.frequency.linearRampToValueAtTime(2800, now + 0.2);

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.25);
    } catch {
      // Audio autoplay cheklovi
    }
  }
}

export const soundEffects = new SoundEffectsManager();
