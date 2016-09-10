//AJAX
import axios from 'axios';

import { browserHistory } from 'react-router'

import * as types from '../constants/ActionTypes';

//////////////////////////////////////
/////////////// LOGIN ////////////////

function requestLogin(creds) {
  return {
    type: types.LOGIN_REQUEST,
    isFetching: true,
    isAuthenticated: false,
    payload: creds
  }
}

function receiveLogin(token) {
  return {
    type: types.LOGIN_SUCCESS,
    isFetching: false,
    isAuthenticated: true,
    payload: token,
    meta: {
        done: true,
        transition: (prevState, nextState, action) => ({
          pathname: '/home'
        })
      }
  }
}

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
            localStorage.setItem('token', response.data);
            localStorage.setItem('userid', response.data.userid);
            dispatch(receiveLogin(response.data));
            browserHistory.push('/home')
        })
        .catch(function(response){
            dispatch(loginError(response));
        });
  }
}


//////////////////////////////////////
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

// FETCH CLASSES
function requestClasses() {
  return {
    type: types.CLASSES_FETCH_REQUEST,
    isFetching: true,
    classes: null
  }
};

function receiveClasses(classes) {
  return {
    type: types.CLASSES_FETCH_SUCCESS,
    isFetching: false,
    payload: classes
  }
}

function classFetchError(message) {
  return {
    type: types.CLASSES_FETCH_FAILURE,
    isFetching: false,
    payload: null,
    message
  }
};

export function fetchClasses(classes) {
  console.log("FETCHCLASSES")
  return {
    // type: types.CLASSES_FETCH_REQUEST,
    // isFetching: true,
    // classes: classes
  }


}
