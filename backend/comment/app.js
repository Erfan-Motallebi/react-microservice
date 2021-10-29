const express = require("express");
const crypto = require("crypto");
const cors = require("cors");
const axios = require("axios").default;

const app = express();

let commentsByPost = {};

app.use(express.json());
app.use(cors());

app.post("/post/:postId/comment", async (req, res) => {
  const { content } = req.body;
  const { postId } = req.params;
  const id = crypto.randomBytes(5).toString("hex");
  let comments = commentsByPost[postId] || [];
  comments.push({
    id,
    content,
  });

  //#region Event-driven Micro Approach

  // await axios.post("http://localhost:5005/event", {
  //   type: "CreateComment",
  //   data: {
  //     id,
  //     comment: content,
  //     postId,
  //   },
  // });

  // Event-driven Micro Approach melded with Moderation Service

  //#endregion

  //#region Event-driven Micro Approach melded with Moderation Service / Comment Service
  await axios.post("http://locahost:5005/event", {
    type: "CreateComment",
    data: {
      id,
      comment: content,
      postId,
      status: "Pending",
    },
  });

  //#endregion

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

app.post("/event", async (req, res) => {
  const { type, data } = req.body;
  console.log("Event Recieved: " + type);
  if (type === "CommentModerated") {
    await axios.post("http://localhost:5005/event", {
      type: "CommentUpdated",
      data,
    });
  }

  res.send({});
});

app.listen(5001, () => {
  console.log("Post Server is running on http://localhost:5001");
});
