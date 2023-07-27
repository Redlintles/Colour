import { useCallback } from "react";

import { Coord } from "../Types/GlobalTypes";

export function useUtils() {
  /* eslint-enable */
  const clamp = useCallback((num: number, min: number, max: number): number => {
    return Math.min(Math.max(num, min), max);
  }, []);

  const all = useCallback((...comparisons: any[]): boolean => {
    for (let i of comparisons) {
      if (!Boolean(i)) {
        return false;
      }
    }
    return true;
  }, []);

  const sum = useCallback((...numbers: number[]): number => {
    return numbers.reduce((acc, crr) => acc + crr, 0);
  }, []);

  const degToRad = useCallback((deg: number) => (Math.PI / 180) * deg, []);
  const radToDeg = useCallback((rad: number) => (rad * 180) / Math.PI, []);
  const cartesianDistance = useCallback((p1: Coord, p2: Coord) => {
    const distance: number = (p2[0] - p1[0]) ** 2 + (p2[1] - p1[1]) ** 2;
    return Math.sqrt(distance);
  }, []);

  return { clamp, all, sum, degToRad, cartesianDistance , radToDeg};
}
