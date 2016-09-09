// ADD USER
//AJAX
import axios from 'axios';

import { browserHistory } from 'react-router'

import * as types from '../constants/ActionTypes';
function requestAddClass(classInfo) {
  return {
    type: types.ADDCLASS_REQUEST,
    isFetching: true,
    payload: classInfo
  }
};

function addedClass(newClass) {
  return {
    type: types.ADDCLASS_SUCCESS,
    isFetching: false,
    payload: newClass,
    meta: {
        done: true,
        transition: (prevState, nextState, action) => ({
          pathname: '/home'
        })
      }
  }
}

function classAddError(message) {
  return {
    type: types.ADDCLASS_FAILURE,
    isFetching: false,
    payload: null,
    message
  }
};

export function addClass(classInfo) {
  console.log("ADDCLASS", classInfo)
  var info = {
    name: classInfo.name,
    grade: classInfo.grade,
    subject: classInfo.subject,
    UserId: classInfo.UserId
  }
  return function(dispatch) {
    dispatch(requestAddClass(classInfo));
      return axios.post('/api/add/classes', { "name": info.name, "grade": info.grade, "subject": info.subject, "UserId": info.UserId })
        .then(function(response){
            dispatch(addedClass(response.data));
            browserHistory.push('/home')
        })
        .catch(function(response){
            dispatch(classAddError(response));
        });
  }
  
  
}