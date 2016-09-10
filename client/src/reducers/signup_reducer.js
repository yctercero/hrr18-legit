import {
  SIGNUP_REQUEST, SIGNUP_SUCCESS, SIGNUP_FAILURE
} from '../constants/ActionTypes.js'

// The auth reducer. The starting state sets authentication
// based on a token being in local storage. In a real app,
// we would also want a util to check if the token is expired.
export default function signupReducer(state = {
    isFetching: false,
    isAuthenticated: localStorage.getItem('token') ? true : false
  }, action) {
  switch (action.type) {
    case SIGNUP_REQUEST:
        console.log("SIGNUP REQUESTED");
        return Object.assign({}, state, {
            isFetching: true,
            isAuthenticated: false,
            userInfo: action.payload.info
        })
    case SIGNUP_SUCCESS:
      console.log("SIGNUP SUCCEEDED");
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: true,
        token: action.payload.token
      })
    case SIGNUP_FAILURE:
      console.log("SIGNUP SUCCEEDED");
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: false,
        token: action.message
      })
    default:
      return state
  }
};