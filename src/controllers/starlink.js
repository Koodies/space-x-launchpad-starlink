const {get} = require("../lib/fetch")
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
    12: "December"
}
let starlinks

async function getAllStarlinks() {
    try {
        const result = {}
        const {status, data } = await get("https://api.spacexdata.com/v4/starlink")
        if(status !== 200) throw new Error("Some error occurred")
        data.forEach(starlink => {
            if(!starlink.spaceTrack["LAUNCH_DATE"]) return
            const launch_date = new Date(starlink.spaceTrack["LAUNCH_DATE"])
            const year = launch_date.getFullYear()
            const month = Month[launch_date.getMonth()+1]
            const day = launch_date.getDay()
            if(result[year] === undefined) result[year] = {}
            if(result[year][month] === undefined) result[year][month] = {}
            if(result[year][month][day] === undefined) result[year][month][day] = {}
            result[year][month][day] = {...result[year][month][day], starlink}
        })
        starlinks = {...result}
    } catch (error) {
        //log error
        result = {}
    }
}

function getStarlink(year = 0, month = 0, day = 0) {
    try {
        if(!starlinks) throw new Error('Still loading data')
        if(month === 0) return starlinks[year]
        if(day === 0) return starlinks[year][Month[month]]
        return starlinks[year][Month[month]][day]
    } catch (error) {
        //log error
        if(error.message === "still loading data") return "Loading data, please try again later"
        return "Not found"
    }
}

module.exports = {
    getAllStarlinks,
    getStarlink
}