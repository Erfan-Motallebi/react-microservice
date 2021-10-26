import React, { useEffect, useState } from "react";

import axios from "axios";
import CreateComment from "../../comment/CreateComment";
import Comment from "../../comment/Comment";

function Posts() {
  const [posts, setPosts] = useState([]);

  const fetchData = async () => {
    const response = await axios.request({
      url: "http://localhost:5000/posts",
      method: "GET",
    });
    setPosts(response.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <div className="row">
        {posts.map(({ id, title }) => {
          <section>
            <Comment postId={id} />
          </section>;
          return (
            <div className="col-4 mt-4" key={id}>
              <CreateComment postId={id} />
              <ul className="list-group">
                <li className="list-group-item">
                  <h4>{title}</h4>
                </li>
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Posts;
