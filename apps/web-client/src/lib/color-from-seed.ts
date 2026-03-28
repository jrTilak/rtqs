/**
 * Generates a consistent color from a seed.
 * @param seed - Any stable value (id, name, email, etc)
 * @param  opacity - 0..1 (controls visual lightness)
 * @returns  rgba(r, g, b, a)
 */
export const colorFromSeed = (seed: string | number, opacity = 1) => {
  // 1. Hash the seed into a 32-bit number
  let hash = 0;
  const str = String(seed);

  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  // 2. Extract RGB from hash
  const r = (hash >> 16) & 255;
  const g = (hash >> 8) & 255;
  const b = hash & 255;

  // 3. Clamp opacity
  const a = Math.max(0, Math.min(1, opacity));

  return `rgba(${r}, ${g}, ${b}, ${a})`;
};
