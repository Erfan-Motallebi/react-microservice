/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import axios from "axios";

function Comment({ postId }) {
  const [comments, setComments] = useState([]);

  const fetchComment = async () => {
    const resp = await axios.request({
      url: `http://localhost:5001/post/${postId}/comments`,
      headers: {
        "Content-Type": "application/json",
      },
      method: "GET",
    });
    setComments(resp.data);
  };

  useEffect(() => {
    fetchComment();
  }, []);
  // console.log({ comment: comments[postId] });
  return (
    <div>
      {
        <ul>
          {comments.length > 0 &&
            comments.map(({ id, content }) => {
              return <li key={id}>{content}</li>;
            })}
        </ul>
      }
    </div>
  );
}

export default React.memo(Comment);
