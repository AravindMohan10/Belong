import { describe, expect, it } from "vitest";
import { appendSlugSuffix, slugifyClubName } from "./slug";

describe("slugifyClubName", () => {
  it("slugifies a club name", () => {
    expect(slugifyClubName("Sunday Cinema Walks")).toBe("sunday-cinema-walks");
  });

  it("appends suffix for collisions", () => {
    expect(appendSlugSuffix("sunday-cinema-walks", 2)).toBe("sunday-cinema-walks-2");
  });
});
