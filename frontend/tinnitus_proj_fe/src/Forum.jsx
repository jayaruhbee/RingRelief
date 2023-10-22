import React from "react";
import "./App.css";
import userContext from "./context/userContext";
import { useContext, useEffect, useState } from "react";
import Post from "./components/Post";
import CreatePost from "./components/CreatePost";
import ForumHeader from "./components/ForumHeader";
import Keywords from "./components/Keywords";

function Forum() {
  const { userInfo } = useContext(userContext);
  
  return (
    <>
      <ForumHeader />
      <div className="flex flex-col min-h-screen">
        <main className="flex-1 flex pr-5">
          <Keywords />

          <div className="Forum border-2 rounded-lg bg-slate-400 flex w-3/4 mt-8 ">
            <div className="w-full p-4">
              <CreatePost author={userInfo} />
              <Post userInfo={userInfo}/>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default Forum;
