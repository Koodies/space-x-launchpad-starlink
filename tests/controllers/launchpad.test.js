const { getFailedLaunches } = require("../../src/controllers/launchpad");

describe("Get all information about failed launches", () => {
  test("return all failure launches", async () => {
    const launchID = "5e9e4502f5090995de566f86";
    const expectedResponse = {
      launchpad: "Kwajalein Atoll",
      all_failures: [
        {
          name: "Trailblazer",
          failures: [
            "residual stage-1 thrust led to collision between stage 1 and stage 2",
          ],
        },
        {
          name: "DemoSat",
          failures: [
            "harmonic oscillation leading to premature engine shutdown",
          ],
        },
        {
          name: "FalconSat",
          failures: ["merlin engine failure"],
        },
      ],
    };
    const result = await getFailedLaunches(launchID);
    expect(result).toStrictEqual(expectedResponse);
  });

  test("return empty json on unexist launchID", async () => {
    const launchID = "xxxxxxxxxxxxxxxxxx";
    const expectedResponse = {launchpad: null, all_failures: []};
    const result = await getFailedLaunches(launchID);
    expect(result).toStrictEqual(expectedResponse);
  });
});
