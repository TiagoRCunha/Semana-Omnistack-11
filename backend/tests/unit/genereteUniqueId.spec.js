const generateUniqueId = require("../../src/utils/genereteUniqueId");

describe("Generate unique ID", () => {
  it("shoud generate an unique ID", () => {
    const id = generateUniqueId();

    expect(id).toHaveLength(8);
  });
});
