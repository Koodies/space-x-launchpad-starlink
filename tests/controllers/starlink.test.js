const {
  getStarlink,
  getAllStarlinks,
} = require("../../src/controllers/starlink");

beforeAll(async () => {
  await getAllStarlinks();
});

describe("Get all information about starlink", () => {
  test("return starlinks launched in year 2019", () => {
    const result = getStarlink(2019);
    expect(result).toBeTruthy();
  });

  test("return starlinks launched on May 5th 2019", () => {
    const result = getStarlink(2019, 5, 5);
    expect(result).toBeTruthy();
    expect(result).toEqual(
        expect.objectContaining({
          starlink: expect.any(Object),
        })
      );
  });

  test("return starlinks launched in June 2020", () => {
    const result = getStarlink(2020, 6);
    expect(result).toBeTruthy();
  });
});
