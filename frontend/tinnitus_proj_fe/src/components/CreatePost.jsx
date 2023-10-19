import { api } from "../utilities";
import { useState } from "react";

const Post = () => {
  const [newPost, setNewPost] = useState("");

  const createPost = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("post/create/", { content: newPost });
      console.log("✅ Post Created", response.data)
      setNewPost("");
    } catch (error) {
      console.error("⛔️", error);
    }
  };

return (
    <>
    <form className="bg-red-200 text-center"
    onSubmit={createPost}> Create Post
    <input
    type="text"
    placeholder="Write something..."
    value={newPost}
    onChange={(e) => setNewPost(e.target.value)}
    />
    <button type="submit" className="border-black border-2">POST</button>
    </form>
    </>
)
}
export default Post;
