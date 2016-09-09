// See actions/index.js to see where/how/when the action types are being dispatched

import {
  LOGIN_SUCCESS, LOGIN_REQUEST, LOGIN_FAILURE
} from '../constants/ActionTypes.js'

// The starting state sets authentication based on a token being in local storage. 
// This should mean the user does not have to sign back in every single time the page refreshes or if they come
// back to the page after already loggin in.
// Ideally, we would also want a util to check if the token is expired.
export default function signinReducer(state = {
    isFetching: false,
    isAuthenticated: localStorage.getItem('token') ? true : false
  }, action) {
  switch (action.type) {
    case LOGIN_REQUEST:
        console.log("LOGIN REQUESTED")
        return Object.assign({}, state, {
            isFetching: true,
            isAuthenticated: false,
            userInfo: action.creds
        })
    case LOGIN_SUCCESS:
      console.log("LOGIN SUCCEEDED");
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: true,
        token: action.payload.token
      })
    case LOGIN_SUCCESS:
      console.log("LOGIN SUCCEEDED");
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: false,
        token: action.message
      })
    default:
      return state
  }
};