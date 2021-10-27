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
  await axios.post("http://localhost:5000/event", req.body);
  await axios.post("http://localhost:5001/event", req.body);
  await axios.post("http://localhost:5002/event", req.body);

  res.send({});
});

app.listen(5005, () => {
  console.log("Event bus is on http://localhost:5005");
});
