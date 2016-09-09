import { combineReducers } from 'redux';

// Reducers
import SigninReducer from './signin_reducer.js';
import ClassesReducer from './classes_reducer.js';


const rootReducer = combineReducers({
    signin: SigninReducer,
    getClass: ClassesReducer
});

export default rootReducer;