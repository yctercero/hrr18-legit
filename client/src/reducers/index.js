import { combineReducers } from 'redux';

// Reducers
import AuthReducer from './auth_reducer.js';
import ClassesReducer from './classes_reducer.js';
import StudentsReducer from './students_reducer.js';
import SigupReducer from './signup_reducer.js';
import AssignmentReducer from './assignment_reducer.js';

const rootReducer = combineReducers({
    signin: AuthReducer,
    getClass: ClassesReducer,
    students: StudentsReducer,
    signup: SigupReducer,
    assignment: AssignmentReducer,
});

export default rootReducer;