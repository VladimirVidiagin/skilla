export function secondsToString(input: number) {
  const hours = Math.floor(input / 3600)
    .toString()
    .padStart(2, "0");
  const minutes = Math.floor((input % 3600) / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (input % 60).toString().padStart(2, "0");

  if (hours !== "00") {
    return `${hours}:${minutes}:${seconds}`;
  }

  return `${minutes}:${seconds}`;
}
