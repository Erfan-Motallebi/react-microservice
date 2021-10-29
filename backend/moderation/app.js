const express = require("express");
const cors = require("cors");
const axios = require("axios").default;

const app = express();
app.use(express.json());
app.use(cors());

app.post("/event", (req, res) => {
  const { data, type } = req.body;
  console.log("Event Recieved: " + type);
  console.log({ data });

  let newComment;

  setTimeout(async () => {
    if (
      data.comment.includes("fuck") ||
      data.comment.includes("cunt") ||
      data.comment.includes("Fuck")
    ) {
      newComment = {
        type: "CommentModerated",
        data: {
          ...data,
          status: "rejected",
        },
      };
    } else {
      newComment = {
        type: "CommentModerated",
        data: {
          ...data,
          status: "approved",
        },
      };
    }
    await axios.post("http://localhost:5005/event", newComment);
  }, 5000);

  res.send({ newComment });
});

app.listen(5003, () => {
  console.log("Moderation is up on http://localhost:5003");
});
