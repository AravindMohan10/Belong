import { describe, expect, it } from "vitest";
import { distanceKm, formatDistanceKm } from "./distance";

describe("distanceKm", () => {
  it("returns zero for the same point", () => {
    const point = { latitude: 40.6782, longitude: -73.9442 };
    expect(distanceKm(point, point)).toBe(0);
  });

  it("measures Brooklyn clubs as close together", () => {
    const williamsburg = { latitude: 40.7081, longitude: -73.9571 };
    const dumbo = { latitude: 40.7033, longitude: -73.9888 };
    const distance = distanceKm(williamsburg, dumbo);

    expect(distance).toBeGreaterThan(2);
    expect(distance).toBeLessThan(5);
  });
});

describe("formatDistanceKm", () => {
  it("formats short distances", () => {
    expect(formatDistanceKm(0.4)).toBe("Under 1 km away");
    expect(formatDistanceKm(3.2)).toBe("3.2 km away");
    expect(formatDistanceKm(42)).toBe("42 km away");
  });
});
