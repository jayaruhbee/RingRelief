// import "@passageidentity/passage-elements/passage-register";
import '@passageidentity/passage-elements/passage-auth';
import { PassageUser } from '@passageidentity/passage-elements/passage-user';
import React, {useState, useEffect,useContext, useRef} from "react";
import axios from "axios";
import './App.css';
import userContext from './context/themeContext';
// import { PassageAuth } from '@passageidentity/passage-react';

function Registration() {
const {userInfo, setUserInfo} = useContext(userContext)
console.log(userInfo, "USER INFO STATE")
const ref = useRef();

 if(Object.keys(userInfo).length !== 0){
    console.log("USER", user)
     useEffect(() => {
          async function fetchUserInfo() {
            try {
              const userInfo = await user.userInfo();
              console.log(userInfo);
              setUserInfo(userInfo);
            //   const formData = {
            //     passage_user_id: userInfo.id,
            //     email: userInfo.email,
            //     username: userInfo.user_metadata.username,
            //     first_name: userInfo.user_metadata.first_name,
            //     last_name: userInfo.user_metadata.last_name,
            //     };
            //   createUser(formData);
            } catch (error) {
              console.error(error);
            }
          }
          fetchUserInfo();
        }, [])
 }
 else{
    console.log("NO USER")
 }



function createUser(formData) {
    const apiUrl = 'http://127.0.0.1:8000/api/user/create_user/';
    axios
      .post(apiUrl, formData)
      .then((response) => {
        console.log('User created:', response.data);
      })
      .catch((error) => {
        console.error('Error creating user:', error);
      });
  }

const beforeAuth = (email)=>{
    console.log("beforeAuth called", email)
    return email
}

const onSuccess = (authResult) =>{
    localStorage.setItem('psg_auth_token', authResult.auth_token)
    console.log("onSuccess called", authResult)
    window.location.href = authResult.redirect_url
    return authResult
}

useEffect(() => {
    const { current } = ref;
    current.beforeAuth = beforeAuth;
    current.onSuccess;
    return () => {};
});


  return (
        <div id="auth-div">
             {/* <PassageAuth /> */}
             <passage-register
          ref={ref}
            app-id={import.meta.env.VITE_REACT_APP_PASSAGE_APP_ID}
            beforeAuth={beforeAuth}
            onSuccess={onSuccess}
          ></passage-register>
          
          {/* <passage-auth
          ref={ref}
            app-id={import.meta.env.VITE_REACT_APP_PASSAGE_APP_ID}
            beforeAuth={beforeAuth}
          ></passage-auth> */}
        </div>
  );
}

export default Registration;
