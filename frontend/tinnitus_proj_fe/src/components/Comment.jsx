import React, { useEffect, useState, useContext } from "react";
import { api } from "../utilities";
import { FaEllipsisH } from "react-icons/fa";
import userContext from "../context/themeContext";
import './Forum.css'

const Comment = ({ postId}) => {
  const { userInfo } = useContext(userContext);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [editComment, setEditComment] = useState(null);
  const [editedComment, setEditedComment] = useState("")
  const [toggledOptions, setToggledOptions] = useState(false);

  /*TODO: FIX STATE FOR POST/COMMENTS WITHOUT RELOAD*/

  // ACCESS ALL COMMENTS ON POST
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

  // COMMENT ON A POST
  const handleAddComment = async (event) => {
    event.preventDefault();
    const commenterData = userInfo.id;
    console.log("commenter data:", userInfo)
    const postData = {
      text: newComment,
      commenter: commenterData,
    };

    try {
      const response = await api.post(`post/post_comment/${postId}/`, postData);
      // console.log("✅ Comment Created", response.data);
      setNewComment("");
    } catch (error) {
      console.error("⛔️", error);
    }
  };

  // DELETE A COMMENT ON A POST
  const handleCommentDelete = async (commentId) => {
    try {
      const response = await api.delete(`post/delete_comment/${commentId}/`);
      console.log("delete clicked, comment deleted");
    } catch (error) {
      console.log(error);
    }
  };
  
  // EDIT A COMMENT ON A POST
  const handleCommentEdit = async (commentId) => {
    try {
      const response = await api.put(`post/edit_comment/${commentId}/`, { text: editedComment });
      setComments((prevComments) =>
        prevComments.map((comment) =>
          comment.id === commentId ? { ...comment, text: editedComment } : comment
        )
      );
      setEditComment(null); 
    } catch (error) {
      console.log(error);
    }
  };

  const toggleCommentOptions = (commentId) => {
    if (toggledOptions === commentId) {
      setToggledOptions(!toggledOptions);
    } else {
      setToggledOptions(commentId);
    }
  };


  return (
    <div className="hind mx-4">
    <ul>
      {comments.map((comment) => (
        <li id ="commentdisplay-wrapper" key={comment.id} className="individual-comment-container mb-2 p-4 rounded-md relative">
          {editComment === comment.id ? (
            <div>
              <textarea
                  className="w-full rounded-lg bg-gray-300 p-2"
                  value={editedComment}
                  onChange={(e) => setEditedComment(e.target.value)}
                ></textarea>
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded-md mt-2"
                  onClick={() => handleCommentEdit(comment.id)}
                >
                Save
              </button>
            </div>
          ) : (
            <div className="flex flex-row items-start">
              <div className="commenter-header flex flex-row">
                <p className="commenter-name capitalize text-lg font-bold">
                  <i id="user-fa-icon" className="fa-solid fa-circle-user"></i>
                  {comment.commenter.username} replied:
                </p>
              </div>
              {comment.commenter.passage_id === userInfo.id && (
                <div className="toggle-options-container absolute top-2 right-2">
                <FaEllipsisH
                  onClick={() => toggleCommentOptions(comment.id)}
                  className="toggle-comment-options text-2xl cursor-pointer"
                />
                  {toggledOptions && (
                    <div className="comment-options-toggle flex flex-col bg-white p-2 rounded-lg ">
                      <button
                        className="p-2 text-blue-600 hover:underline"
                        onClick={() => setEditComment(comment.id)}
                      >
                        Edit
                      </button>
                      <button
                        className="p-2 text-red-600 hover:underline"
                        onClick={() => handleCommentDelete(comment.id)}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
          <p id="comment-reply-text" className="text-gray-700 bg-white py-3">{comment.text}</p>
        </li>
      ))}
    </ul>
    <form className="text-right">
      <textarea
        className="w-full rounded-lg bg-gray-300 px-2 pt-2"
        placeholder="Share your thoughts!"
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
      >
      </textarea>
      <button
        id="post-button-forum"
        className="text-white rounded-lg text-sm px-5 py-2.5 text-center mb-2"
        type="submit"
        onClick={handleAddComment}
      >
        Add Comment
      </button>
    </form>
  </div>
  
  );
  
};

export default Comment;
