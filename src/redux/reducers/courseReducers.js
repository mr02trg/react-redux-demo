import * as types from '../actions/actionTypes';


// note our store in this demo will be an array of courses
// state refer to the actually data objects in the store
export default function courseReducer(state = [], action) {
    // debugger;
    switch(action.type) {
        case types.CREATE_COURSE:
            return [...state, { ...action.course}];
        default:
            return state;
    }
}