import React, { useState } from "react";
import axios from "axios";
import Posts from "./Posts";

function CreatePost() {
  const [post, setPost] = useState("");

  const submitHanlder = async (e) => {
    e.preventDefault();

    if (post.trim() === "") {
      alert("Empty Post");
      return true;
    }
    await axios.request({
      // url: "http://localhost:5000/post",
      url: "http://192.168.49.2:30007/post",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        title: post,
      },
    });

    setPost("");
  };

  return (
    <section>
      <article>
        <header>
          <h1 className="bg-blue">Create Post</h1>
        </header>
        <div className="mt-4">
          <form onSubmit={submitHanlder}>
            <input
              type="text"
              className="form-control"
              name="post"
              id="post"
              value={post}
              onChange={(e) => setPost(e.target.value)}
            />
            <div className="d-grid col-6 mt-4 mx-auto">
              <button type="submit" className="btn btn-lg btn-outline-primary">
                Send
              </button>
            </div>
          </form>
        </div>
      </article>
      <section>
        <Posts />
      </section>
    </section>
  );
}

export default CreatePost;
