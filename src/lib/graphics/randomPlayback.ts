// Durations use real playback time, independently of the current speed.
export const playbackRanges = {
  speed: [0.55, 1.65],
  transition: [2, 5],
  hold: [2, 7]
} as const;

export function createRandomPlayback(random: () => number = Math.random) {
  const sample = ([min, max]: readonly [number, number]) => min + random() * (max - min);
  let from = 1;
  let target = sample(playbackRanges.speed);
  let duration = sample(playbackRanges.transition);
  let position = 0;
  let transitioning = true;
  // Integral of smoothstep: integrating speed keeps motion continuous and
  // makes the result independent of the number of rendered frames.
  const integral = (t: number) => t * t * t - 0.5 * t * t * t * t;

  return {
    advance(seconds: number) {
      let remaining = Math.max(0, seconds);
      let animationSeconds = 0;
      while (remaining > 0) {
        const step = Math.min(remaining, duration - position);
        if (transitioning) {
          const start = position / duration;
          const end = (position + step) / duration;
          animationSeconds += from * step +
            (target - from) * duration * (integral(end) - integral(start));
        } else {
          animationSeconds += target * step;
        }
        remaining -= step;
        position += step;
        if (position >= duration) {
          position = 0;
          if (transitioning) {
            transitioning = false;
            duration = sample(playbackRanges.hold);
          } else {
            transitioning = true;
            from = target;
            target = sample(playbackRanges.speed);
            duration = sample(playbackRanges.transition);
          }
        }
      }
      return animationSeconds;
    }
  };
}
