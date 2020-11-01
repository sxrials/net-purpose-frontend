import { formatUsd } from "./currency";

describe("formatUsd", () => {
  it("adds comma separator", () => {
    expect(formatUsd(1234567890)).toBe("1,234,567,890");
  });
});
