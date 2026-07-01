import { describe, expect, it } from "vitest";
import { signInCustomSchema } from "./auth";
import { formField } from "./form";

describe("signInCustomSchema", () => {
  it("accepts guest sign-in without a next path", () => {
    const parsed = signInCustomSchema.safeParse({
      role: "guest",
      displayName: "Alex",
      city: "Brooklyn, NY",
      next: formField(null),
    });

    expect(parsed.success).toBe(true);
  });

  it("accepts guest sign-in with a return path", () => {
    const parsed = signInCustomSchema.safeParse({
      role: "guest",
      displayName: "Alex",
      city: "Brooklyn, NY",
      next: formField("/clubs/sunday-cinema-walks"),
    });

    expect(parsed.success).toBe(true);
  });

  it("requires a city for guests", () => {
    const parsed = signInCustomSchema.safeParse({
      role: "guest",
      displayName: "Alex",
      next: formField(null),
    });

    expect(parsed.success).toBe(false);
  });
});
