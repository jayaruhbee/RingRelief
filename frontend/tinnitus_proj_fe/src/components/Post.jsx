import { api } from "../utilities";
import { useState, useEffect } from "react";
import { FaRegCommentDots } from "react-icons/fa";
import Comment from "./Comment";
import DeleteButton from "./DeleteButton";

const Post = ({userInfo}) => {
  const [posts, setPosts] = useState([]);
  const [openComments, setOpenComments] = useState({});

  useEffect(() => {
    const getPosts = async () => {
      try {
        const response = await api.get("post/");
        // console.log("✅ Posts", response.data);

        const formattedPosts = response.data
          .sort((a, b) => {
            const dateA = new Date(a.created_at);
            const dateB = new Date(b.created_at);
            return dateB - dateA;
          })
          .map((post) => {
            const dateTime = new Date(post.created_at);
            const formattedDate = dateTime.toLocaleDateString("en-US", {
              month: "short",
              day: "2-digit",
              year: "numeric",
            });
            const formattedTime = dateTime.toLocaleTimeString("en-US", {
              hour: "numeric",
              minute: "2-digit",
            });

            return {
              ...post,
              formattedDate,
              formattedTime,
            };
          });

        setPosts(formattedPosts);
      } catch (error) {
        console.error("⛔️ error grabbing posts", error);
      }
    };
    getPosts();
  }, []);

  // TOGGLE POST'S COMMENTS
  const toggleComments = (postId) => {
    setOpenComments((prevState) => ({
      ...prevState,
      [postId]: !prevState[postId],
    }));
  };

  // DELETE
  const handlePostDelete = async (postId) => {
    console.log("clicked");
    try {
      const response = await api.delete(`post/delete/${postId}/`);
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
      console.log("delete clicked, post removed");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="post-container">
        {posts.map((post) => (
          <div key={post.id} className="my-4 mx-2">
            <div className="individual-post hind bg-white rounded-md shadow-md p-4 m-2">
              <div className="post-header flex flex-row justify-between pb-3">
                <div className="user-header flex flex-row">
                  <h3 className="author capitalize  text-2xl shadow-lg p-2">
                    {post.author.username}
                  </h3>
                </div>
                <div className="date-and-time text-end">
                  <p className="date text-sm text-black">
                    {post.formattedDate}
                  </p>
                  <p className="time text-sm text-black">
                    {post.formattedTime}
                  </p>
                </div>
              </div>
              <div>
                <p className="post-content text-lg text-gray-800 border-b py-6 pl-2 bg-gray-100 rounded-md ">
                  {post.content}
                </p>
                {/* DELETE POSTS */}
                {post.author.passage_id === userInfo.id && ( 
                  <DeleteButton onDelete={() => handlePostDelete(post.id)} />
                  )}
              </div>
              <div className="show-comments text-right">
                {/* SHOW COMMENTS/ ADD COMMENTS VIEW */}
                <button
                  className="text-3xl py-2 text-gray-800 hover:text-blue-500"
                  onClick={() => toggleComments(post.id)}
                >
                  <FaRegCommentDots />
                </button>
              </div>
              {openComments[post.id] && (
                <Comment postId={post.id} commenter={userInfo} />
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
export default Post;
