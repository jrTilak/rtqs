import { pick } from "./pick";

describe("pick", () => {
  it("should pick specified keys from the object", () => {
    const obj = { a: 1, b: 2, c: 3 };
    const result = pick(obj, ["a", "c"]);
    expect(result).toEqual({ a: 1, c: 3 });
  });
  it("should return an empty object if no keys are specified", () => {
    const obj = { a: 1, b: 2 };
    const result = pick(obj, []);
    expect(result).toEqual({});
  });
  it("should return an object with all keys if all keys are picked", () => {
    const obj = { a: 1, b: 2 };
    const result = pick(obj, ["a", "b"]);
    expect(result).toEqual(obj);
  });
});
