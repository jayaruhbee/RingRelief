import React, { useContext }  from "react";
import {Route, Switch, Redirect} from "react-router-dom";
import Feed from "./Feed";
import Registration from './Registraion';
import Home from './Home'
import Profile from "./Profile";
import Login from "./Login";
import SignOut from "./SignOut";

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

      </Switch>
    )
}

export default Routes;