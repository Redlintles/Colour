export function useRandomColor() {
  function randomColor() {
    let color: string = "#";

    for (let i = 0; i < 3; i++) {
      let random: number = Math.round(Math.random() * 255);
      let parsed: string = random.toString(16);
      if (parsed.length === 1) {
        parsed = parsed.padStart(2, "0");
      }
      color += parsed;
    }
    return color;
  }

  return randomColor;
}
