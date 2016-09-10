// ACTIONS FOR LOGIN, SIGNUP AND LOGOUT

//Axios is essentially JQuery's AJAX simplified
//https://www.npmjs.com/package/axios
import axios from 'axios';
// Allows you to re-route the user
import { browserHistory } from 'react-router'
// Action types are held separately for modularity purposes
import * as types from '../constants/ActionTypes';

/////////////// LOGIN ////////////////
// Called before api request, info sent to reducers. 
// Reducer waiting for this action type is in reducers/signin_reducer.js
function requestLogin(creds) {
  return {
    type: types.LOGIN_REQUEST,
    isFetching: true,
    isAuthenticated: false,
    payload: creds
  }
}

// Called upon successfull api request, info sent to reducers.
// Reducer waiting for this action type is in reducers/signin_reducer.js
function receiveLogin(token) {
  return {
    type: types.LOGIN_SUCCESS,
    isFetching: false,
    isAuthenticated: true,
    payload: token
  }
}

// Called if error signing in, info sent to reducers.
// Reducer waiting for this action type is in reducers/signin_reducer.js
function loginError(message) {
  return {
    type: types.LOGIN_FAILURE,
    isFetching: false,
    isAuthenticated: false,
    payload: message
  }
}

export function loginUser(creds) {
  return function(dispatch) {
      dispatch(requestLogin(creds));
      return axios.post('/signin', { "email": creds.email, "password": creds.password})
        .then(function(response){
            // storing userid and token in local storage
            // to then use for authentication purposes
            localStorage.setItem('token', response.data);
            localStorage.setItem('userid', response.data.userid);
            // call receiveLogin so user data gets sent to reducers to create new state
            dispatch(receiveLogin(response.data));
            // redircet user to the main dashboard
            browserHistory.push('/home')
        })
        .catch(function(response){
            dispatch(loginError(response));
        });
  }
}



/////////////// SIGNUP ////////////////
function requestSignup(info) {
  return {
    type: types.SIGNUP_REQUEST,
    isFetching: true,
    isAuthenticated: false,
    payload: info
  }
};

function receiveSignup(token) {
  return {
    type: types.SIGNUP_SUCCESS,
    isFetching: false,
    isAuthenticated: true,
    payload: token,
    meta: {
        done: true,
        transition: (prevState, nextState, action) => ({
          pathname: '/home'
        })
    }
  };
}

function signupError(message) {
  return {
    type: types.SIGNUP_FAILURE,
    isFetching: false,
    isAuthenticated: false,
    message
  }
};

export function signupUser(info) {

  return function(dispatch) {
    dispatch(requestLogin(info));
    console.log("HERE");
    return axios.post('/signup', {
      email: info.email,
      password: info.password
  })
    .then(function (response) {

        localStorage.setItem('token', response.data);
        dispatch(receiveSignup(response.data));
        browserHistory.push('/home');
        console.log("line 104", response);
      })
      .catch(function (response) {
        console.log(response);
        dispatch(signupError(response));
      });
  }
}


/////////////// LOGOUT ////////////////
// Called before logout request, info sent to reducers. 
// Reducer waiting for this action type is in reducers/logout_reducer.js
function requestLogout() {
  return {
    type: types.LOGOUT_REQUEST,
    isFetching: true,
    isAuthenticated: false,
  }
}

// Called upon successfull logout request, info sent to reducers.
// Reducer waiting for this action type is in reducers/logout_reducer.js
function receiveLogout() {
  return {
    type: types.LOGOUT_SUCCESS,
    isFetching: false,
    isAuthenticated: false,
  }
}

export function logoutUser() {
  return dispatch => {
    dispatch(requestLogout())
    // clear out local storage 
    localStorage.removeItem('token')
    localStorage.removeItem('userid')
    // redircet user to login
    browserHistory.push('/signin');
    dispatch(receiveLogout())
  }
}
