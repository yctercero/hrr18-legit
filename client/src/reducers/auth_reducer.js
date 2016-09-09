import {
  SIGNUP_REQUEST, SIGNUP_SUCCESS, SIGNUP_FAILURE, LOGIN_SUCCESS
} from '../constants/ActionTypes.js'

console.log("HERE");
// The auth reducer. The starting state sets authentication
// based on a token being in local storage. In a real app,
// we would also want a util to check if the token is expired.
export default function auth(state = {
    isFetching: false,
    isAuthenticated: localStorage.getItem('id_token') ? true : false
  }, action) {
  switch (action.type) {
    case SIGNUP_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        isAuthenticated: false,
        user: action.info
      })
    case SIGNUP_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: true,
        errorMessage: ''
      })
    case SIGNUP_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: false,
        errorMessage: action.message
      })
    case LOGIN_SUCCESS:
      console.log("HERE", action);
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: true,
        token: action.token
      })
    default:
      return state
  }
};