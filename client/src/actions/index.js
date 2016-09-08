import * as types from '../constants/ActionTypes';

export function addUser(email) {
    return { type: types.ADD_USER, email }
}

export function addClass() {
    return { type: types.ADD_CLASS }
}

export function addStudent() {
    return { type: types.ADD_STUDENT }
}

export function addAssignment() {
    return { type: types.ADD_ASSIGNMENT }
}

export function editClass() {
    return { type: types.EDIT_CLASS }
}

export function editStudent() {
    return { type: types.EDIT_STUDENT }
}
// addStudent
// addClass
// addAssignment
// addUser
// signIn
// editStudent
// editClass
// editAssignment
// getUserInfo
// getClassList
// getClassInfo
// getStudentList
// getStudentInfo
// getAssignmentList
// getAssignmentInfo