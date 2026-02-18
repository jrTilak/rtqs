import { omit } from "./omit";

describe("omit", () => {
  it("should omit specified keys from the object", () => {
    const obj = { a: 1, b: 2, c: 3 };
    const result = omit(obj, ["b", "c"]);
    expect(result).toEqual({ a: 1 });
  });

  it("should return the same object if no keys are specified", () => {
    const obj = { a: 1, b: 2 };
    const result = omit(obj, []);
    expect(result).toEqual(obj);
  });

  it("should return an empty object if all keys are omitted", () => {
    const obj = { a: 1, b: 2 };
    const result = omit(obj, ["a", "b"]);
    expect(result).toEqual({});
  });
});
