const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

let posts = [];

app.get("/posts", (req, res) => {
  res.status(200).json(posts);
});

app.post("/event", (req, res) => {
  const { type, data } = req.body;

  //#region Moderation Service Approach

  // if (type === "CreatePost") {
  //   const { id, title } = data;
  //   posts.push({
  //     id,
  //     title,
  //     comments: [],
  //   });
  // } else if (type === "CommentModerated") {
  //   if (data?.status.trim() === "rejected") {
  //     const { id, comment, postId } = data;
  //     let newPosts = [];
  //     newPosts = posts.map((post) => {
  //       if (postId === post.id) {
  //         post.comments.push({
  //           id,
  //           comment: "Comment was rejected through Moderator",
  //           postId,
  //         });
  //       }
  //       return post;
  //     });
  //     posts = newPosts;
  //   } else if (data?.status.trim() === "approved") {
  //     const { id, comment, postId } = data;
  //     let newPosts = [];
  //     newPosts = posts.map((post) => {
  //       if (postId === post.id) {
  //         post.comments.push({ id, comment, postId });
  //       }
  //       return post;
  //     });
  //     posts = newPosts;
  //   }
  // }

  //#endregion

  if (type === "CreatePost") {
    const { id, title } = data;
    posts.push({
      id,
      title,
      comments: [],
    });
  }
  if (type === "CreateComment") {
    const { id, comment, postId } = data;
    let newPosts = [];
    newPosts = posts.map((post) => {
      if (postId === post.id) {
        post.comments.push({ id, comment, postId });
      }
      return post;
    });
    posts = newPosts;
  }

  console.log(posts);

  res.send({ Query: "Success" });
});

app.listen(5002, () => {
  console.log("Post Server is running on http://localhost:5002");
});
