const express = require("express");
const crypto = require("crypto");
const cors = require("cors");

const app = express();

let commentsByPost = {};

app.use(express.json());
app.use(cors());

app.post("/post/:postId/comment", (req, res) => {
  const { content } = req.body;
  const { postId } = req.params;
  let comments = commentsByPost[postId] || [];
  comments.push({
    id: crypto.randomBytes(5).toString("hex"),
    content,
  });
  commentsByPost[postId] = comments;
  res.status(201).json(commentsByPost);
});

app.get("/post/:postId/comments", (req, res) => {
  res.status(200).json(commentsByPost[postId] || {});
});

app.listen(5001, () => {
  console.log("Post Server is running on http://localhost:5001");
});
