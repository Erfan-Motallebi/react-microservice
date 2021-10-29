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

  //#region First-look Microservice Approach without using moderation Service

  // if (type === "CreatePost") {
  //   const { id, title } = data;
  //   posts.push({
  //     id,
  //     title,
  //     comments: [],
  //   });
  // }
  // if (type === "CreateComment") {
  //   const { id, content, postId } = data;
  //   let newPosts = [];
  //   newPosts = posts.map((post) => {
  //     if (postId === post.id) {
  //       post.comments.push({ id, content, postId });
  //     }
  //     return post;
  //   });
  //   posts = newPosts;
  // }

  //#endregion

  //#region Second Approach Moderation Service Approach - First Approach - Without Pending Status

  // if (type === "CreatePost") {
  //   const { id, title } = data;
  //   posts.push({
  //     id,
  //     title,
  //     comments: [],
  //   });
  // } else if (type === "CommentModerated") {
  //   if (data?.status.trim() === "rejected") {
  //     const { id, content, postId } = data;
  //     let newPosts = [];
  //     newPosts = posts.map((post) => {
  //       if (postId === post.id) {
  //         post.comments.push({
  //           id,
  //           content: "Comment was rejected through Moderator",
  //           postId,
  //         });
  //       }
  //       return post;
  //     });
  //     posts = newPosts;
  //   } else if (data?.status.trim() === "approved") {
  //     const { id, content, postId } = data;
  //     let newPosts = [];
  //     newPosts = posts.map((post) => {
  //       if (postId === post.id) {
  //         post.comments.push({ id, content, postId });
  //       }
  //       return post;
  //     });
  //     posts = newPosts;
  //   }
  // }

  //#endregion

  //#region  Second Approach of Moderation Service with Pending Status

  // if (type === "CreatePost") {
  //   const { id, title } = data;
  //   posts.push({
  //     id,
  //     title,
  //     comments: [],
  //   });
  // } else if (type === "CommentModerated") {
  //   if (data?.status.trim() === "rejected") {
  //     const { id, postId } = data;
  //     let newPosts = posts.map((post) => {
  //       if (postId === post.id) {
  //         const newComments = post.comments.map((comment) => {
  //           if (comment.id === id) {
  //             comment = {
  //               ...comment,
  //               content: "Comment was rejected through the Moderator",
  //             };
  //           }
  //           return comment;
  //         });
  //         post.comments = newComments;
  //       }
  //       return post;
  //     });
  //     posts = newPosts;
  //   } else if (data?.status.trim() === "approved") {
  //     const { id, comment, postId } = data;
  //     let newPosts = posts.map((post) => {
  //       if (postId === post.id) {
  //         const newComments = post.comments.map((cmnt) => {
  //           if (cmnt.id === id) {
  //             cmnt = {
  //               ...cmnt,
  //               comment,
  //             };
  //           }
  //           return cmnt;
  //         });
  //         post.comments = newComments;
  //       }
  //       return post;
  //     });
  //     posts = newPosts;
  //   }
  // } else if (type === "CreateComment") {
  //   const {
  //     data: { id, postId },
  //   } = req.body;
  //   let newPosts = posts.map((post) => {
  //     if (postId === post.id) {
  //       post.comments.push({ id, comment: "Pending - Checking Posts . . . " });
  //     }
  //     return post;
  //   });
  //   posts = newPosts;
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
    const { id, postId, status } = data;
    let newPosts = [];
    newPosts = posts.map((post) => {
      if (postId === post.id) {
        post.comments.push({
          id,
          content: "Pending - Moderation Service is watching . . .",
          postId,
          status,
        });
      }
      return post;
    });
    posts = newPosts;
  }
  if (type === "CommentUpdated") {
    const { id, content, postId, status } = data;
    let newPosts = posts.map((post) => {
      if (postId === post.id) {
        post.comments = post.comments.map((cmnt) => {
          if (cmnt.id === id) {
            cmnt = {
              id,
              postId,
              content,
              status,
            };
          }
          return cmnt;
        });
      }
      return post;
    });
    posts = newPosts;
  }

  //#endregion

  res.send({ Query: "Success" });
});

app.listen(5002, () => {
  console.log("Post Server is running on http://localhost:5002");
});
