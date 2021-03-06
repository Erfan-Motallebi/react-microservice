/* eslint-disable react-hooks/exhaustive-deps */
// import React, { useState, useEffect } from "react";
// import axios from "axios";

import React, { memo } from "react";

// function Comment({ postId }) {
function Comment({ comments }) {
  //#region Monolithic Approach
  //  const [commentsData, setCommentsData] = useState([]);

  // const fetchComment = async () => {

  //   const { data } = await axios.request({
  //     url: `http://localhost:5002/posts`,
  //     // url: `http://localhost:5001/${postId}/comments`,
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     method: "GET",
  //   });

  //   // setCommentsData(data)

  //   /**
  //    * Event-driven Micro Approach
  //    */
  //   // eslint-disable-next-line array-callback-return
  //   const commentsRelated = data.find((post) => {
  //     if (post.id === postId) {
  //       return post.comments;
  //     }
  //   });
  //   setCommentsData(commentsRelated);
  // };

  // useEffect(() => {
  //   fetchComment();
  // }, []);

  //#endregion
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
        // <ul className="list-group">
        //   {commentsData.comments &&
        //     commentsData.comments.length > 0 &&
        //     commentsData.comments.map(({ id, comment }) => {
        //       return (
        //         <li
        //           key={id}
        //           className="list-group-item list-group-item-primary"
        //         >
        //           {comment}
        //         </li>
        //       );
        //     })}
        // </ul>
        <ul className="list-group">
          {comments &&
            comments.map(({ id, content, status }) => {
              let updatedContent;
              if (status === "pending")
                updatedContent = "Pending . . . - It's being supervised";
              else if (status === "rejected")
                updatedContent =
                  "Content contained offensice words - rejected.";
              else if (status === "approved") updatedContent = content;

              return (
                <li
                  key={id}
                  className="list-group-item list-group-item-primary mt-2"
                >
                  {updatedContent}
                </li>
              );
            })}
        </ul>
      }
    </div>
  );
}

export default memo(Comment);
