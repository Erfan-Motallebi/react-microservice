import React, { useState } from "react";
import axios from "axios";

function CreateComment({ postId }) {
  const [comment, setComment] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    if (comment.trim() === "") {
      alert("Empty Comment");
      return;
    }
    await axios.request({
      url: `http://localhost:5001/post/${postId}/comment`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        content: comment,
      },
    });
    setComment("");
  };

  return (
    <div>
      <form onSubmit={submitHandler}>
        <label htmlFor="comment" className="form-label">
          Enter a comment :
        </label>
        <input
          type="text"
          name="comment"
          id="comment"
          className="form-control"
          placeholder="Your Comment"
          onChange={(e) => setComment(e.target.value)}
        />
        <div className="d-grid col-6 mx-auto m-2">
          <button type="submit" className="btn btn-secondary">
            Comment
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateComment;
