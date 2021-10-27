/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";

import axios from "axios";
import Comment from "../comment/Comment";
import CreateComment from "../comment/CreateComment";

function Posts() {
  const [posts, setPosts] = useState([]);
  const fetchData = async () => {
    const response = await axios.request({
      url: "http://localhost:5002/posts",
      // url: "http://localhost:5000/posts",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    setPosts(response.data);
  };

  /**
   * Sync Mode
   */

  // const fetchData = async () => {
  //   const response = await axios.request({
  //     url: "http://localhost:5000/posts?comments=true",
  //     method: "GET",
  //   });
  //   setPosts(response.data);
  // };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <div className="row">
        {posts.map(({ id, title, comments }) => {
          // console.log({ id, title, comments });
          return (
            <div className="col-4 mt-4" key={id}>
              <div className="card">
                <h4 style={{ textAlign: "center", marginTop: "10px" }}>
                  {title}
                </h4>
                <section className="card-body">
                  <CreateComment postId={id} />
                  <section>
                    {/* <Comment postId={id} /> */}
                    <Comment comments={comments} />
                  </section>
                </section>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Posts;
