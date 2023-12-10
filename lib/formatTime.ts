export default function formatTime(time: number) {
  const minutes = Math.floor(time / 60)
    .toFixed(0)
    .toString()
    .padStart(2, '0');
  const seconds = (time % 60).toFixed(0).toString().padStart(2, '0');
  return `${minutes}:${seconds}`;
}
