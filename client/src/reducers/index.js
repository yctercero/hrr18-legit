import { combineReducers } from 'redux';

// Reducers
import SigninReducer from './signin_reducer.js';
import ClassesReducer from './classes_reducer.js';
import StudentsReducer from './students_reducer.js';
import SigupReducer from './signup_reducer.js';

const rootReducer = combineReducers({
    signin: SigninReducer,
    getClass: ClassesReducer,
    students: StudentsReducer,
    signup: SigupReducer
});

export default rootReducer;