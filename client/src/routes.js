import React from 'react';
import ReactDOM from 'react-dom';
import {Router, IndexRoute } from 'react-router';

import App from './components/App.jsx';
import Welcome from './components/auth/welcome/welcome_component.jsx';
import Login from './components/auth/login/login_component.jsx';
import Signup from './components/auth/signup/signup_component.jsx';

export default (

<Router path="/" component={App} >
    <Router path="/welcome" component={Welcome} />
    <Router path="/signin" component={Login} />
    <Router path="/signup" component={Signup} />
</Router>
)