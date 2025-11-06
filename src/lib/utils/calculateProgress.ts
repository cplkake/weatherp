export default function calculateProgress(current: number, [start, end]: [number, number]) {
  const raw = (current - start) / (end - start);
  return Math.min(Math.max(raw, 0), 1);
}