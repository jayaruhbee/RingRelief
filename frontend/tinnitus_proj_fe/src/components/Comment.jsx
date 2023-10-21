import React, { useEffect, useState } from "react";
import { api } from "../utilities";
import { FaUser } from "react-icons/fa";
import DeleteButton from "./DeleteButton";

const Comment = ({ postId, commenter }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  console.log("commenter from comment", commenter.passage_id);
  console.log("postID", postId);
/*TODO: FIX STATE FOR POST/COMMENTS WITHOUT RELOAD*/

// TO ACCESS ALL COMMENTS ON A POST
  useEffect(() => {
    const getComments = async () => {
      try {
        const response = await api.get(`post/comments/${postId}/`);
        console.log("response", response.data);
        setComments(response.data);
      } catch (error) {
        console.error("⛔️", error);
      }
    };

    getComments();
  }, [postId]);

// TO CREATE A COMMENT ON A POST
  const handleAddComment = async (event) => {
    event.preventDefault();
    const commenterData = commenter.passage_id;
    // console.log("commenter data:", commenterData)
    const postData = {
      text: newComment,
      commenter: commenterData,
    };

    try {
      const response = await api.post(`post/post_comment/${postId}/`, postData);
      // console.log("newcomment", newComment);
      // console.log("✅ Comment Created", response.data);
      setNewComment("");
    } catch (error) {
      console.error("⛔️", error);
    }
  };
// DELETE A COMMENT ON A POST
  const handleCommentDelete = async (commentId) => {
    console.log("clicked");
    try {
      const response = await api.delete(`post/delete_comment/${commentId}/`);
      console.log("delete clicked, comment deleted");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>
            <div className="commenter-header flex flex-row ">
              <p className="commenter-name capitalize">
                <FaUser /> {comment.commenter.username}
              </p>
            </div>
            {comment.text}
          </li>
        ))}
      </ul>
      <form>
        <textarea
        className="w-full rounded-lg bg-gray-300 "
        placeholder="Share your thoughts!"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        ></textarea>
        <button type="submit" onClick={handleAddComment}>
          Add Comment
        </button>
      </form>
      <DeleteButton onDelete={() => handleCommentDelete(post.id)} />
    </div>
  );
};

export default Comment;
