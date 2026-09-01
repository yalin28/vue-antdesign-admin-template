import { describe, it, expect } from "vitest";
import { NumberFormat, formatDate } from "@/utils/filter";
import { timeFix, welcome } from "@/utils/util";
import storage from "@/utils/storage";

describe("Utils & Filters Units", () => {
  it("NumberFormat should format numbers with thousand separators", () => {
    expect(NumberFormat(1000)).toBe("1,000");
    expect(NumberFormat(1234567)).toBe("1,234,567");
    expect(NumberFormat(0)).toBe("0");
    expect(NumberFormat(null)).toBe("0");
  });

  it("formatDate should format timestamp or date correctly", () => {
    const dateStr = "2026-09-01 10:00:00";
    expect(formatDate(dateStr, "YYYY-MM-DD")).toBe("2026-09-01");
    expect(formatDate(null)).toBe("");
  });

  it("welcome should return greeting message", () => {
    const text = welcome();
    expect(typeof text).toBe("string");
    expect(text.length).toBeGreaterThan(0);
  });

  it("storage should get, set, and expire data properly", () => {
    storage.clear();
    expect(storage.get("custom_key", "default_val")).toBe("default_val");

    storage.set("custom_key", { name: "test" });
    expect(storage.get("custom_key")).toEqual({ name: "test" });

    storage.remove("custom_key");
    expect(storage.get("custom_key")).toBeNull();
  });
});
