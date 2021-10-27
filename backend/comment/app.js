const express = require("express");
const crypto = require("crypto");
const cors = require("cors");
const axios = require("axios");

const app = express();

let commentsByPost = {};

app.use(express.json());
app.use(cors());

app.post("/post/:postId/comment", async (req, res) => {
  const { content } = req.body;
  const { postId } = req.params;
  const randomBytes = crypto.randomBytes(5).toString("hex");
  let comments = commentsByPost[postId] || [];
  comments.push({
    id: randomBytes,
    content,
  });

  // Event-driven Micro Approach

  commentsByPost[postId] = comments;
  res.status(201).json(commentsByPost);
});

app.get("/post/:postId/comments", (req, res) => {
  const { postId } = req.params;
  res.status(200).json(commentsByPost[postId] || {});
});

/**
 * Event-driven Micro Approach Route
 */

app.post("/event", (req, res) => {
  const { type } = req.body;
  console.log("Event Recieved: " + type);
  res.send({});
});

app.listen(5001, () => {
  console.log("Post Server is running on http://localhost:5001");
});
