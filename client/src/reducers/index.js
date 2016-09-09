import { combineReducers } from 'redux';

// Reducers
import SigninReducer from './signin_reducer.js';


const rootReducer = combineReducers({
    signin: SigninReducer,
});

export default rootReducer;