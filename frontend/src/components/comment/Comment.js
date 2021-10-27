/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import axios from "axios";

function Comment({ postId }) {
  const [commentsData, setCommentsData] = useState([]);

  const fetchComment = async () => {
    const { data } = await axios.request({
      url: `http://localhost:5002/posts`,
      // url: `http://localhost:5001/${postId}/comments`,
      headers: {
        "Content-Type": "application/json",
      },
      method: "GET",
    });

    // setCommentsData(data)

    /**
     * Event-driven Micro Approach
     */
    // eslint-disable-next-line array-callback-return
    const commentsRelated = data.find((post) => {
      if (post.id === postId) {
        return post.comments;
      }
    });
    setCommentsData(commentsRelated);
  };

  useEffect(() => {
    fetchComment();
  }, []);
  return (
    <div>
      {/* {
        commentsData && commentsData.comments.length > 0 &&
        <ul>
        commentsData.comments.map(({id, content}) => {
          return  return <li key={id}>{comment}</li>;
        })
        </ul>

      } */}
      {
        <ul>
          {commentsData.comments &&
            commentsData.comments.length > 0 &&
            commentsData.comments.map(({ id, comment }) => {
              return <li key={id}>{comment}</li>;
            })}
        </ul>
      }
    </div>
  );
}

export default React.memo(Comment);
