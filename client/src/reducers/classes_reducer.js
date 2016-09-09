import {
  CLASSES_FETCH_SUCCESS, CLASSES_FETCH_REQUEST, CLASSES_FETCH_FAILURE
} from '../constants/ActionTypes.js'


export default function classesReducer(state = {
    
  }, action) {
  switch (action.type) {
    case CLASSES_FETCH_REQUEST:
        console.log("CLASSES_FETCH_REQUEST")
        return Object.assign({}, state, {
            isFetching: true,
        })
    case CLASSES_FETCH_SUCCESS:
      console.log("CLASSES_FETCH_SUCCESS");
      return Object.assign({}, state, {
        isFetching: false,
        classes: action.classes,
      })
    case CLASSES_FETCH_FAILURE:
      console.log("CLASSES_FETCH_FAILURE");
      return Object.assign({}, state, {
        isFetching: false,
        classes: null,
      })
    default:
      return state
  }
};