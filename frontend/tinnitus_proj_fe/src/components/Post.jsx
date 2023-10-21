import { api } from "../utilities";
import { useState, useEffect } from "react";
import { FaUser } from "react-icons/fa";
import { FaRegCommentDots } from "react-icons/fa";
import Comment from "./Comment";
import DeleteButton from "./DeleteButton";
import CreatePost from "./CreatePost";
// import { IconName } from "react-icons/bs";


const Post = () => {
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
    // if (!handlePostDelete) {
      getPosts();
    // }
  }, []);

  const toggleComments = (postId) => {
    setOpenComments((prevState) => ({
      ...prevState,
      [postId]: !prevState[postId],
    }));
  };

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
  console.log("post commenter", posts[1]);
  return (
    <>
      <div className="post-container">
        {posts.map((post) => (
          <div key={post.id}>
            <div className="individual-post hind my-4 mx-2 rounded-lg bg-white border-1 border-black shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)] ">
              <div className="post-header flex flex-row justify-between border-b">
                <div className="user-header flex flex-row gap-2 my-4 ">
                  {/* <FaUser className="text-3xl ml-3"/> */}
                  <h3 className="author capitalize underline text-2xl ml-3">
                    {post.author.username}
                  </h3>
                </div>
                <div className="date-and-time pt-2 pr-2">
                  <p className="date text-sm text-end text-black">
                    {post.formattedDate}
                  </p>
                  <p className="time text-sm text-end text-black">
                    {post.formattedTime}
                  </p>
                  {/* DELETE POSTS  */}
                  <DeleteButton onDelete={() => handlePostDelete(post.id)} />
                </div>
              </div>
              <p className="post-content text-lg text-gray-800 leading-6 p-2 border-b">
                {post.content}
              </p>
              <div className="flex flex-row-reverse pr-10 text-gray-800   ">
                {/* SHOW COMMENTS/ ADD COMMENTS */}
                <button
                  className="text-2xl"
                  onClick={() => toggleComments(post.id)}
                >
                  <FaRegCommentDots />
                </button>
              </div>
              {openComments[post.id] && (
                <Comment postId={post.id} commenter={post.author} />
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
export default Post;
