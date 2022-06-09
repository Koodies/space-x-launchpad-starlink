const { get } = require("../lib/fetch");
const Month = {
  1: "January",
  2: "February",
  3: "March",
  4: "April",
  5: "May",
  6: "June",
  7: "July",
  8: "August",
  9: "September",
  10: "October",
  11: "November",
  12: "December",
};
let starlinks;

async function getAllStarlinks() {
  try {
    const result = {};
    const { status, data } = await get(
      "https://api.spacexdata.com/v4/starlink"
    );
    if (status !== 200) throw new Error("Some error occurred");
    data.forEach((starlink) => {
      if (!starlink.spaceTrack["LAUNCH_DATE"]) return;
      const launch_date = new Date(starlink.spaceTrack["LAUNCH_DATE"]);
      const year = launch_date.getFullYear();
      const month = Month[launch_date.getMonth() + 1];
      const day = launch_date.getDay();
      if (result[year] === undefined) result[year] = {};
      if (result[year][month] === undefined) result[year][month] = {};
      if (result[year][month][day] === undefined) result[year][month][day] = {};
      result[year][month][day] = { ...result[year][month][day], starlink };
    });
    starlinks = { ...result };
  } catch (error) {
    //log error
    result = {};
  }
}

function getStarlink(year = 0, month = 0, day = 0) {
  try {
    let data = {};
    if (!starlinks) throw new Error("still loading data");
    if (year === 0) {
      data = { ...starlinks };
    } else if (month === 0) {
      data = { ...starlinks[year] };
    } else if (day === 0) {
      data = { ...starlinks[year][Month[month]] };
    } else {
      data = { ...starlinks[year][Month[month]][day] };
    }
    if (Object.entries(data).length === 0) throw new Error("not found");
    return { status: "success", data };
  } catch (error) {
    //log error
    if (error.message === "still loading data")
      return {
        status: "error",
        message: "Loading data, please try again later",
      };
    return { status: "error", message: "No data found" };
  }
}

module.exports = {
  getAllStarlinks,
  getStarlink,
};
