import React, { useEffect, useState } from "react";
import { api } from "../utilities";
import { FaUser } from "react-icons/fa";


const Comment = ({ postId}) => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
console.log("postID", postId)

  useEffect(() => {
    const getComments = async () => {
        try {
            const response = await api.get(`post/comments/${postId}/`);
            console.log("Comments:", response.data)
            setComments(response.data)
          } catch (error) {
            console.error("⛔️", error);
          }
        };getComments()
    },[postId])

  const handleAddComment = async () => {
    try {
        const response = await api.post(`post/post_comment/${postId}/`, { content: newComment });
        console.log("✅ Comment Created", response.data)
        setNewComment("");
      } catch (error) {
        console.error("⛔️", error);
      }
    };

return (
    <div>
      <ul>
        {comments.map((comment) => (
            <li key={comment.id}>
            <div className="commenter-header flex flex-row"><p className="commenter-name capitalize">      <FaUser /> {comment.commenter.username}</p></div>
                {comment.text}
          </li>
        ))}                
      </ul>
      <textarea
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
      ></textarea>
      <button onClick={handleAddComment}>Add Comment</button>
    </div>
  );
};

export default Comment;