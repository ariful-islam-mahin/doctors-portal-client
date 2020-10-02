import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import Appointment from '../Appointment/Appointment';
import Home from '../Home/Home';
import Navbar from '../Navbar/Navbar';
import NoMatch from '../NoMatch/NoMatch';

const Main = () => {
    return (
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
                <Route path='*'>
                    <NoMatch></NoMatch>
                </Route>
            </Switch>
        </Router>
    );
};

export default Main;