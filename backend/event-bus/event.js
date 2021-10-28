const axios = require("axios").default;
const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(cors());

app.post("/event", async (req, res) => {
  // First apporach of the filter 1. providing a service

  const { type, data } = req.body;
  console.log({ type, data });

  if (type === "CreateComment") {
    await axios.post("http://localhost:5003/event", req.body);
    res.status(200).json({ Network: "Moderation", operation: "success" });
  } else {
    await axios.post("http://localhost:5000/event", req.body);
    await axios.post("http://localhost:5001/event", req.body);
    await axios.post("http://localhost:5002/event", req.body);
    console.log({ eventEmitted: true, success: true });
    res.send({});
  }
});

app.listen(5005, () => {
  console.log("Event bus is on http://localhost:5005");
});
