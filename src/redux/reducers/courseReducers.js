import * as types from '../actions/actionTypes';
import initialState from './initialState';

// note our store in this demo will be an array of courses
// state refer to the actually data objects in the store
export default function courseReducer(state = initialState.courses, action) {
    // debugger;
    switch(action.type) {
        case types.CREATE_COURSE:
            return [...state, { ...action.course}];
        case types.LOAD_COURSES_SUCCESS:
            // courses fetched from api
            return action.courses;
        default:
            return state;
    }
}