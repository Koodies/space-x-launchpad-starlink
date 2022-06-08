const fetch = require("node-fetch");

async function get(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`${await response.text()}`);
    return { status: 200, data: await response.json() };
  } catch (error) {
    return { status: 404, message: error.message };
  }
}

async function post(url, body) {
  try {
    const response = await fetch(url, {
      method: "post",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) throw new Error(`${await response.text()}`);
    return { status: 200, data: await response.json() };
  } catch (error) {
    return { status: 404, message: error.message };
  }
}

module.exports = {
  get,
  post,
};
