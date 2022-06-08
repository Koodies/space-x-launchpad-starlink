const { get, post } = require("../lib/fetch");

async function getFailedLaunches(launchpadID) {
  try {
    const launchpad = await getLaunchPadName(launchpadID);
    const datas = await getLaunchDocs(launchpadID);
    let all_failures = [];
    datas.forEach((data) => {
      const failures = data["failures"].map((failure) => failure.reason);
      all_failures.push({
        name: data["name"],
        failures,
      });
    });
    return {
      launchpad,
      all_failures,
    };
  } catch (error) {
    //log error
    return {}
  }
}

async function getLaunchPadName(launchpadID) {
  const response = await get(
    `https://api.spacexdata.com/v4/launchpads/${launchpadID}`
  );
  if (response.status !== 200) return null;
  return response.data.name;
}

async function getLaunchDocs(launchpadID) {
  const query = {
    launchpad: launchpadID,
    failures: { $exists: true, $not: { $size: 0 } },
  };
  const options = {
    sort: {
      _id: "desc",
    },

  };
  const response = await post("https://api.spacexdata.com/v4/launches/query", {
    query,
    options,
  });
  if (response.status !== 200) return [];
  return response.data.docs;
}

module.exports = {
  getFailedLaunches
};
