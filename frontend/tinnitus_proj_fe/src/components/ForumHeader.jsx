import React, {useContext} from "react";
import './Forum.css'
import forumPostContext from "../context/forumPostContext";

const ForumHeader = () => {
  
  // const {forumPostContext} = useContext(forumPostContext);

  return (
    <header >
      <h1 id="forum-title" className="text-4xl mb-2">Tinnitus Support Forum</h1>
      <p id="forum-desc-p" className="text-lg mb-4">
        A Safe Space to Discuss, Find Support, and Share Your Tinnitus Journey.
      </p>
    </header>
  );
};
export default ForumHeader;
