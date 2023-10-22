import { api } from "../utilities";
import { useState } from "react";

const CreatePost = ({ author}) => {
  const [newPost, setNewPost] = useState("");

  const handleCreatePost = async (e) => {
    e.preventDefault();
    const authorData = {
      first_name: author.user_metadata.first_name,
      last_name: author.user_metadata.last_name,
      email: author.email,
      passage_id: author.id,
      specialist: author.user_metadata.specialist,
      username: author.user_metadata.username,
      interests: author.user_metadata.interests,
    };
    const postData = {
      content: newPost,
      author: authorData,
    };

    try {
      const response = await api.post("post/create/", postData);
      setNewPost("");
    //  console.log("POST CREATED:", response)

    } catch (error) {
      console.error("error", error);
    }
  };

  return (
    <>
      <div className="my-4 mx-4 rounded-md bg-white border-1 border-black shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1) flex flex-col">
        <p className="montserrat text-gray-800 text-center text-lg border-b-2 border-gray-200 py-2">
          Create Post
        </p>
        <form className="m-5">
          <textarea
            className="w-full border-b-2 border-gray-200 p-2"
            placeholder="Write something..."
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            rows={2}
          ></textarea>
          <button
            className="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-2"
            type="submit"
            onClick={handleCreatePost}
          >
            Post
          </button>
        </form>
      </div>
    </>
  );
};
export default CreatePost;
