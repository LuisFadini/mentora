import { describe, expect, it } from "vitest";

import { removeUndefined } from "./remove-undefined.ts";

describe("removeUndefined", () => {
  it("removes undefined properties", () => {
    const obj = {
      id: 1,
      name: undefined,
      email: "john@example.com",
    };

    expect(removeUndefined(obj)).toEqual({
      id: 1,
      email: "john@example.com",
    });
  });

  it("preserves null values", () => {
    const obj = {
      id: 1,
      name: null,
      email: undefined,
    };

    expect(removeUndefined(obj)).toEqual({
      id: 1,
      name: null,
    });
  });

  it("returns an empty object when all values are undefined", () => {
    expect(
      removeUndefined({
        a: undefined,
        b: undefined,
      }),
    ).toEqual({});
  });

  it("returns the same values when nothing is undefined", () => {
    const obj = {
      id: 1,
      name: "John",
    };

    expect(removeUndefined(obj)).toEqual(obj);
  });

  it("does not mutate the original object", () => {
    const obj = {
      id: 1,
      name: undefined,
    };

    removeUndefined(obj);

    expect(obj).toEqual({
      id: 1,
      name: undefined,
    });
  });
});
