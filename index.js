const nodeFetch = require("node-fetch").default;
// const axios = require("axios").default;
const express = require("express");
const app = express();
const port = 8080;

const callApi = async () => {
  try {
    const data = await nodeFetch(
      "http://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id=296&date=09-05-2021",
      {
        headers: {
          accept: "application/json",
          "host": "cdn-api.co-vin.in",
          "origin": "https://www.cowin.gov.in",
          "user-agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36 Edg/90.0.818.56",
        },
      }
    );

    // console.log(data);

    //const result = await data.json();
    console.log("Data received", data);
    return data;
  } catch (ex) {
    console.log("error", ex);
    return "error";
  }
};

app.get("/", (req, res) => {
  res.status(200).send("0.0.1");
});

app.get("/centers", async (req, res) => {
  try {
    const centers = await callApi();
    
    //console.log("centers", centers.data);
    centers?.json().then((data)=> {
      res.status(200).send(data);
      console.log("response", data);
    })
   
  } catch (ex) {
    console.log("error",ex)
    res.status(500).send("errror", ex);
  }
});

app.listen(process.env.PORT || port, () => {
  //callApi();
  console.log(`Example app listening at http://localhost:${port}`);
});
