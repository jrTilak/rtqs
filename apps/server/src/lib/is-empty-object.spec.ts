import { isEmptyObject } from "./is-empty-object";

describe("isEmptyObject", () => {
  it("should return false for non object values", () => {
    expect(isEmptyObject([])).toBe(false);
    expect(isEmptyObject("")).toBe(false);
  });

  it("should return false for non empty objects", () => {
    expect(isEmptyObject({ foo: "bar" })).toBe(false);
  });

  it("should return true for empty objects", () => {
    expect(isEmptyObject({})).toBe(true);
  });
});
