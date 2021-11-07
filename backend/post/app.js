const express = require("express");
const crypto = require("crypto");
const cors = require("cors");

// Sync mode of Microserivce
const axios = require("axios").default;

const app = express();

let posts = [];

app.use(express.json());
app.use(cors());

app.post("/post", async (req, res) => {
  const id = crypto.randomBytes(5).toString("hex");
  const { title } = req.body;
  posts.push({
    id,
    title,
  });

  // event-driven Micro approach
  // await axios.post("http://localhost:5005/event", {
  //   type: "CreatePost",
  //   data: {
  //     id,
  //     title,
  //   },
  // });

  // Kubernetes + ClusterIp - within pods in the cluster
  await axios.post("http://event-bus-clusterip-srv:5005/event", {
    type: "CreatePost",
    data: {
      id,
      title,
    },
  });

  res.status(201).json({ posts });
});

app.get("/posts", async (req, res) => {
  res.status(200).json(posts);
});

/**
 * Event-driven Microservice Approach
 */

app.post("/event", async (req, res) => {
  const { type } = req.body;
  console.log("Event Recieved: " + type);
  res.send({});
});

app.listen(5000, () => {
  console.log("v5");
  console.log("Post Server is running on 💠 http://localhost:5000");
});
