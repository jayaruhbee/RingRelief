// import "@passageidentity/passage-elements/passage-register";
import '@passageidentity/passage-elements/passage-auth';
import { PassageUser } from '@passageidentity/passage-elements/passage-user';
import React, {useState, useEffect,useContext, useRef} from "react";
import axios from "axios";
import './App.css';
import userContext from './context/themeContext';
// import { PassageAuth } from '@passageidentity/passage-react';


function SignOut() {
const { userInfo, setUserInfo} = useContext(userContext)


async function signOut() {
    try {
        if (Object.keys(userInfo).length > 0) {
          // User is signed in, proceed with sign-out
          const user = new PassageUser(); 
          await user.signOut();
          setUserInfo({});
          console.log("User signed out");
        } else {
          // User is not signed in, redirect to a different page or URL
          window.location.href = "/"; // Replace with your desired URL
        }
      } catch (error) {
        console.error("Error signing out:", error);
        // Handle the error here, e.g., displaying an error message to the user
      }
  }
  signOut() 

  return (
        <div id="signout-div">
          Bye!
        </div>
  );
}

export default SignOut;
