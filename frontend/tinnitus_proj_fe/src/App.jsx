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
      async function fetchUserInfo() {
        try {
          const userInfoData = await user.userInfo();
          console.log(userInfoData, "USER INFO");
          setUserInfo(userInfoData);
        } catch (error) {
          console.error("Error fetching user information:", error);
        }
      }

      fetchUserInfo();
    }
  }, []); // The empty dependency array ensures that this effect runs once when the component mounts


  //  const user = new PassageUser(); 

  //  if(user){
  //   useEffect(() => {
  //     async function fetchUserInfo() {
  //       try {
  //         const userInfo = await user.userInfo();
  //         console.log(userInfo, "USER INFO");
  //         setUserInfo(userInfo)
  //       } catch (error) {
  //         console.error(error);
  //       }
  //     }
  
  //     fetchUserInfo();
  //   }, [])
  
  //  }


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
