
import '@passageidentity/passage-elements/passage-auth';
import { PassageUser } from '@passageidentity/passage-elements/passage-user';
import React, {useState, useEffect,useContext, useRef} from "react";
import axios from "axios";
import './App.css';
import userContext from './context/themeContext';


function Login() {
const {userInfo, setUserInfo} = useContext(userContext)
console.log(userInfo, "USER INFO STATE")
const ref = useRef();

async function signOut() {
    try {
      await user.signOut();
      console.log("User signed out");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  }

const onSuccess = (authResult) =>{
    localStorage.setItem('psg_auth_token', authResult.auth_token)
    console.log("onSuccess called", authResult)
    window.location.href = authResult.redirect_url
}

useEffect(() => {
    const { current } = ref;
    current.onSuccess;
    return () => {};
});


  return (
        <div id="login-div">
             <passage-login
          ref={ref}
            app-id={import.meta.env.VITE_REACT_APP_PASSAGE_APP_ID}
            onSuccess={onSuccess}
          ></passage-login>
          
        </div>
  );
}

export default Login;
