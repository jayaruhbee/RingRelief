import React from "react";
import './App.css';
import userContext from './context/userContext';
import { useContext } from "react";
import Post from "./components/Post";
function Forum() {
    const {userInfo} = useContext(userContext)
    // const username = userInfo.user_metadata.username
    // console.log(userInfo.user_metadata.username)


  return (
  <>
     <main className="main h-[100vh] w-[100vw] flex justify-end pr-5">
            <div className="Forum border-2 border-red-200 bg-indigo-300 flex justify-center h-[80%] w-[75%]">
 
            <Post />
            </div>
     </main>
  </>
    
  );
}

export default Forum;
