import React, { createContext, useState } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import PrivateRoute from '../PrivateRoute/PrivateRoute';
import Appointment from '../Appointment/Appointment';
import Bookings from '../Bookings/Bookings';
import Home from '../Home/Home';
import Login from '../Login/Login';
import Navbar from '../Navbar/Navbar';
import NoMatch from '../NoMatch/NoMatch';

export const UserContext = createContext();

const Main = () => {
    const [user, setUser] = useState({
      isLoggedIn:false,
      name:'',
      email:'',
      password:'',
      error:'',
      success:false
    });
    return (
        <UserContext.Provider value={[user, setUser]}>
          <Router>
            <Navbar></Navbar>
            <Switch>
                <Route path='/home'>
                    <Home></Home>
                </Route>
                <Route exact path='/'>
                  <Home></Home>
                </Route>
                <Route path='/appointment'>
                  <Appointment></Appointment>
                </Route>
                <Route path='/login'>
                  <Login></Login>
                </Route>
                <PrivateRoute path='/bookings'>
                  <Bookings></Bookings>
                </PrivateRoute>
                <Route path='*'>
                    <NoMatch></NoMatch>
                </Route>
            </Switch>
        </Router>
      </UserContext.Provider>
    );
};

export default Main;