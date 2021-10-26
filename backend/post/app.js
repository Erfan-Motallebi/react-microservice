const express = require("express");
const crypto = require("crypto");
const cors = require("cors");

const app = express();

let posts = [];

app.use(express.json());
app.use(cors());

app.post("/post", (req, res) => {
  const { title } = req.body;
  posts.push({
    id: crypto.randomBytes(5).toString("hex"),
    title,
  });

  res.status(201).json(posts);
});

app.get("/posts", (req, res) => {
  res.status(200).json(posts);
});

app.listen(5000, () => {
  console.log("Post Server is running on http://localhost:5000");
});
