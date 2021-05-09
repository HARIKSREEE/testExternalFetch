const nodeFetch = require("node-fetch");
const axios = require("axios").default;
const express = require("express");
const app = express();
const port = 8080;

const callApi = async () => {
  try {
    const data = await axios.get(
      "https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id=296&date=09-05-2021",
      {
        headers: {
          accept: "application/json",
          host: "cdn-api.co-vin.in",
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36 Edg/90.0.818.56",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );

    // console.log(data);

    //const result = await data.json();
    return data;
  } catch (ex) {
    console.log("error", ex);
  }
};

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/centers", async (req, res) => {
  try {
    const centers = await callApi();
    console.log("centers", centers.data);
    res.send(centers.data);
  } catch (ex) {
    res.send("errror", ex);
  }
});

app.listen(process.env.PORT || port, () => {
  // callApi();
  console.log(`Example app listening at http://localhost:${port}`);
});
