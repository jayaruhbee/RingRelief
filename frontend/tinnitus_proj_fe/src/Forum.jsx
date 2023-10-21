import React from "react";
import "./App.css";
import userContext from "./context/userContext";
import { useContext, useEffect} from "react";
import Post from "./components/Post";
import CreatePost from "./components/CreatePost";
import ForumHeader from "./components/ForumHeader"
function Forum() {
  const { userInfo } = useContext(userContext);
  
  // useEffect(() => {

  // },[])

  

  
  return (
    <div className="flex flex-col min-h-screen">
    <ForumHeader />
    <main className="flex-1 flex justify-end pr-5">
      <div className="Forum border-2 rounded-lg bg-slate-400 flex justify-center w-full sm:w-full lg:w-full xl:w-3/4 mt-6 p-3 sm:p-5 lg:p-8">
        <div className="forum-content w-full">
          <CreatePost author={userInfo} />
          <Post />
        </div>
      </div>
    </main>
  </div>
);
}
 

export default Forum;
