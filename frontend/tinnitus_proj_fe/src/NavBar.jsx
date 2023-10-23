import React, { useContext, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { PassageUser } from "@passageidentity/passage-elements/passage-user";
import "./NavBar.css";
import logo from "./images/testlogo.png";
import userContext from "./context/themeContext";

const NavBar = () => {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [mobileXicon, setmobileXicon] = useState(false);
  const { userInfo } = useContext(userContext);

  // console.log(userInfo, "USER INFO STATE")

    //console.log(userInfo, "USER INFO STATE")

    // if (Object.keys(userInfo).length === 0) {
    //   console.log('✅ userInfo is emoty');
    // } else {
    //   console.log('⛔️ userInfo is truthy');
    // }

  const toggleMenu = () => {
    setMobileMenu(!mobileMenu);
    setmobileXicon(!mobileXicon);
  };

  const toggleMobileBtn = () => {
    setmobileXicon(!mobileXicon);
  };

  return (
    <div id="bardiv" >
        <div id="homelogo" className={` ${mobileMenu ? 'open' : 'close'} `}>
            <NavLink to="/" id="logoNavLinkWrapper"><img src={logo} alt="homelogo"></img></NavLink>
        </div>
        <div id="menudiv" >

            {
              (Object.keys(userInfo).length !== 0)? 
              <>
              <div id="user-menu-div-wrapper">

                <NavLink to="/feed" onClick={toggleMenu} > 
                    Feed
                </NavLink>

                <NavLink to="/medimap" onClick={toggleMenu}>
                  MediMap
                </NavLink>

                <NavLink to="/TFI" onClick={toggleMenu}>
                  TFI
                </NavLink>

                <NavLink to="/forum" onClick={toggleMenu}>
                  Forum
                </NavLink>
              </div>


            <div id="hello-User">

                <p id="hello-user-text"> Hello👋 {userInfo.user_metadata.username}!</p>
            <div id="profile-signout-wrapper">
                <NavLink to="/profile" onClick={toggleMenu} > 
                    Profile
                </NavLink>

                <NavLink to="/signout" onClick={toggleMenu} > 
                    Signout
                </NavLink>
                </div>
            </div>

            </>
              :
              <>
              <div id="login-reg-wrapper">
              <NavLink to="/login" onClick={toggleMenu} >
              LOGIN
             </NavLink>
             
              <NavLink to="/register" onClick={toggleMenu} > 
                     REGISTER
             </NavLink>
             </div>
            </>
            }


           
        </div> 
        <div className={`mobile-menu ${mobileMenu ? 'open' : ''}`} onClick={toggleMenu} >
            <div className="hamburger-icon">
                <div className={`xbtn ${mobileXicon ? 'active' : 'not-active'}`} onClick={toggleMobileBtn}>
                    <span className="burgerlines"></span>
                    <span className="burgerlines"></span>
                    <span className="burgerlines"></span>
                </div>
            </div>
        </div>
        <div className={`overlay ${mobileMenu ? 'open' : ''}`} onClick={toggleMenu}></div>
    </div>
  );
};

export default NavBar;
