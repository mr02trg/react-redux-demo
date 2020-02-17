import * as types from './actionTypes';

// all action must have a type prop
export function createCourse(course) {
    // debugger;
    return {type: types.CREATE_COURSE, course}
}