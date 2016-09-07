import React from 'react';
import ReactDOM from 'react-dom';
import {Router, IndexRoute } from 'react-router';

import App from './components/App.jsx';
import Welcome from './components/auth/welcome/welcome_component.jsx';
import Login from './components/auth/login/login_component.jsx';
import Signup from './components/auth/signup/signup_component.jsx';
import Dashboard from './components/dashboard/mainDashboard/dashboardCentral_component.jsx';
import DashboardClass from './components/dashboard/classDashboard/dashboardClass_component.jsx';
import DashboardStudent from './components/dashboard/studentDashboard/dashboardStudent_component.jsx';
import DashboardAssignment from './components/dashboard/assignmentDashboard/dashboardAssignment_component.jsx';

export default (

<Router path="/" component={App} >
    <Router path="/welcome" component={Welcome} />
    <Router path="/signin" component={Login} />
    <Router path="/signup" component={Signup} />
    <Router path="/home" component={Dashboard} />
    <Router path="/class" component={DashboardClass} />
    <Router path="/student" component={DashboardStudent} />
    <Router path="/assignment" component={DashboardAssignment} />
</Router>
)