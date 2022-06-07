const fetch = require("node-fetch");

module.exports = {
  async getFailedLaunches(launchpadID) {
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
  },
};

async function getLaunchPadName(launchpadID) {
  const response = await fetch(
    `https://api.spacexdata.com/v4/launchpads/${launchpadID}`
  );
  const data = await response.json();
  return data.name;
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
  const response = await fetch("https://api.spacexdata.com/v4/launches/query", {
    method: "post",
    body: JSON.stringify({ query, options }),
    headers: { "Content-Type": "application/json" },
  });
  const data = await response.json();
  return data.docs;
}
