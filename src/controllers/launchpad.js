const fetch = require("node-fetch");

module.exports = {
  async getFailedLaunches(launchpadID) {
    const launchpad = await getLaunchPadName(launchpadID);
    const datas = await getLaunchesData(launchpadID);
    let all_failures = [];
    datas.forEach((data) => {
      if (data["failures"].length != 0) {
        const failures = [data["failures"][0].reason];
        all_failures.push({
          id: data["id"],
          name: data["name"],
          failures,
        });
      }
    });
    all_failures.sort((a, b) => (b["id"] > a["id"] ? 1 : -1));
    all_failures.map((data) => {
      delete data["id"];
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

async function getLaunchesData(launchpadID) {
  const query = {
    id: launchpadID,
  };
  const response = await fetch("https://api.spacexdata.com/v4/launches/query", {
    method: "post",
    body: JSON.stringify(query),
    headers: { "Content-Type": "application/json" },
  });
  const data = await response.json();
  return data.docs;
}
