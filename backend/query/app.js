const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const posts = [];

app.get("/posts", (req, res) => {
  res.status(200).json(posts);
});

app.post("/event", (req, res) => {
  const { type, data } = req.body;

  if (type === "CreatePost") {
    const { id, title } = data;
    posts.push({
      id,
      title,
      comments: [],
    });
  } else if (type === "CreateComment") {
    const { id, comment, postId } = data;
    posts.map((post) => {
      if (postId === post.id) {
        post.comments = [post, { id, comment, postId }];
      }
    });
  }

  console.log(posts);

  res.send({ Query: "Success" });
});

app.listen(5002, () => {
  console.log("Post Server is running on http://localhost:5002");
});
