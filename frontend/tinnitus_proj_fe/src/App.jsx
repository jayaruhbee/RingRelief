// import "@passageidentity/passage-elements/passage-register";
import '@passageidentity/passage-elements/passage-auth';
import { PassageUser } from '@passageidentity/passage-elements/passage-user';
import React, {useState, useEffect} from "react";
import axios from "axios";
import './App.css';
import userContext from "./context/userContext"
import Routes from './Routes'
import NavBar from './NavBar';

function App() {

  const [userInfo, setUserInfo] = useState({});


  useEffect(() => {
    // Check if psg_auth_token is present in local storage
    const psgAuthToken = localStorage.getItem("psg_auth_token");
    if (psgAuthToken) {
      const user = new PassageUser();
      let formData = null;
        async function fetchUserInfo() {
          try {
            const userInfoData = await user.userInfo();
            // console.log(userInfoData, "USER INFO");
            setUserInfo(userInfoData);
            createUser(userInfoData);
        //     formData = {
        //     passage_user_id: userInfoData.id,
        //     email: userInfoData.email,
        //     username: userInfoData.user_metadata.username,
        //     first_name: userInfoData.user_metadata.first_name,
        //     last_name: userInfoData.user_metadata.last_name,
        // }; 
          } catch (error) {
            console.error("Error fetching user information:", error);
          }
        }

      fetchUserInfo();
    }
  }, []); 

  // function createUser(formData) {
  //   const apiUrl = 'http://127.0.0.1:8000/api/user/create_user/';
  //   axios
  //     .post(apiUrl, formData)
  //     .then((response) => {
  //       console.log('User created:', response.data);
  //     })
  //     .catch((error) => {
  //       console.error('Error creating user:', error);
  //     });
  // }

  function createUser(userInfoData) {
    if(!userInfo) {
    const formData = {
      passage_user_id: userInfoData.id,
      email: userInfoData.email,
      username: userInfoData.user_metadata.username,
      first_name: userInfoData.user_metadata.first_name,
      last_name: userInfoData.user_metadata.last_name,
    };

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

  }
  return (
    <div className='App'>
      <userContext.Provider value ={{userInfo,setUserInfo }}>
        <NavBar/>
        <div style={{marginTop:"100px"}}>
          <Routes/>
        </div>
      </userContext.Provider>
      </div>
  );
}

export default App;
