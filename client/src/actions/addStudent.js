// ADD STUDENT
//AJAX
import axios from 'axios';

import { browserHistory } from 'react-router'

import * as types from '../constants/ActionTypes';
function requestAddStudent(studentInfo) {
  return {
    type: types.ADDSTUDENT_REQUEST,
    isFetching: true,
    payload: studentInfo
  }
};

function addedStudent(newStudent) {
  return {
    type: types.ADDSTUDENT_SUCCESS,
    isFetching: false,
    payload: newStudent,
    meta: {
        done: true,
        transition: (prevState, nextState, action) => ({
          pathname: '/class'
        })
      }
  }
}

function studentAddError(message) {
  return {
    type: types.ADDSTUDENT_FAILURE,
    isFetching: false,
    payload: null,
    message
  }
};

export function addStudent(studentInfo) {
  console.log("ADDSTUDENT", studentInfo)
  return function(dispatch) {
    dispatch(requestAddStudent(studentInfo));
      return axios.post('/api/add/students', { "first": studentInfo.first, "last": studentInfo.last })
        .then(function(response){
            dispatch(addedStudent(response.data));
            browserHistory.push('/class')
        })
        .catch(function(response){
            dispatch(studentAddError(response));
        });
  }
  
  
}