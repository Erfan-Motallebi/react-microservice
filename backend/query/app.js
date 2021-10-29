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

  //#region Moderation Service Approach - First Approach

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

  //#region  Second Approach of Moderation Service

  if (type === "CreatePost") {
    const { id, title } = data;
    posts.push({
      id,
      title,
      comments: [],
    });
  } else if (type === "CommentModerated") {
    if (data?.status.trim() === "rejected") {
      const { id, postId } = data;
      let newPosts = posts.map((post) => {
        if (postId === post.id) {
          const newComments = post.comments.map((comment) => {
            if (comment.id) {
              comment = {
                ...comment,
                comment: "Comment was rejected through the Moderator",
              };
            }
            return comment;
          });
          post.comments = newComments;
        }
        return post;
      });
      posts = newPosts;
    } else if (data?.status.trim() === "approved") {
      const { id, comment, postId } = data;
      let newPosts = posts.map((post) => {
        if (postId === post.id) {
          post.comments = [{ id, comment, postId }];
        }
        return post;
      });
      posts = newPosts;
    }
  } else if (type === "CreateComment") {
    const {
      data: { id, postId },
    } = req.body;
    let newPosts = posts.map((post) => {
      if (postId === post.id) {
        post.comments.push({ id, comment: "Pending - Checking Posts . . . " });
      }
      return post;
    });
    posts = newPosts;
  }

  //#endregion

  // if (type === "CreatePost") {
  //   const { id, title } = data;
  //   posts.push({
  //     id,
  //     title,
  //     comments: [],
  //   });
  // }
  // if (type === "CreateComment") {
  //   const { id, comment, postId } = data;
  //   let newPosts = [];
  //   newPosts = posts.map((post) => {
  //     if (postId === post.id) {
  //       post.comments.push({ id, comment, postId });
  //     }
  //     return post;
  //   });
  //   posts = newPosts;
  // }

  res.send({ Query: "Success" });
});

app.listen(5002, () => {
  console.log("Post Server is running on http://localhost:5002");
});
