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
    expect(result.status).toBe("success");
  });

  test("return starlinks launched on May 5th 2019", () => {
    const result = getStarlink(2019, 5, 5);
    expect(result.status).toBe("success");
    expect(result.data).toEqual(
        expect.objectContaining({
          starlink: expect.any(Object),
        })
      );
  });

  test("return starlinks launched in June 2020", () => {
    const result = getStarlink(2020, 6);
    expect(result.status).toBe("success");
  });

  test("return error on searching for starlinks launched in negative day of June 2020", () => {
    const result = getStarlink(2020, 6, -13);
    expect(result.status).toBe("error");
  });

  test("return error on searching for starlinks launched in null day of June 2020", () => {
    const result = getStarlink(2020, 6, null);
    expect(result.status).toBe("error");
  });

  test("return error on searching for starlinks launched with a string day of June 2020", () => {
    const result = getStarlink(2020, 6, "null");
    expect(result.status).toBe("error");
  });

  test("return error on searching for starlinks launched in negative month of 2020", () => {
    const result = getStarlink(2020, -13);
    expect(result.status).toBe("error");
  });

  test("return error on searching for starlinks launched with a negative year", () => {
    const result = getStarlink(-2020);
    expect(result.status).toBe("error");
  });
});
