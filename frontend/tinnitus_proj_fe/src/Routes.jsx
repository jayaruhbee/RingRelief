import React, { useContext }  from "react";
import {Route, Switch, Redirect} from "react-router-dom";
import Feed from "./Feed";
import Registration from './Registraion';
import Home from './Home'
import Profile from "./Profile";
import Login from "./Login";
import SignOut from "./SignOut";
import MediMap from "./MediMap";
import Forum from "./Forum";
import TFI from "./TFI";

const Routes = () => {
   
    
    return(
      <Switch>

        <Route exact path="/">
            <Home/> 
        </Route>

        <Route exact path="/feed">
            <Feed/> 
        </Route>

        <Route exact path="/register">
            <Registration />
        </Route>

        <Route exact path="/profile">
            <Profile />
        </Route>

        <Route exact path="/login">
            <Login />
        </Route>

        <Route exact path="/signout">
            <SignOut />
        </Route>

        <Route exact path="/medimap">
            <MediMap />
            </Route>
        <Route exact path="/forum">
            <Forum />
        </Route>

        <Route exact path="/TFI">
            <TFI />
        </Route>

      </Switch>
    )
}

export default Routes;