import * as types from './actionTypes';
import * as courseApi from '../../api/courseApi';

// all action must have a type prop
export function createCourse(course) {
    // debugger;
    return {type: types.CREATE_COURSE, course}
}

export function loadCoursesSuccess(courses) {
    return {type: types.LOAD_COURSES_SUCCESS, courses};
}

export function loadCourses() {
    return dispatch => {
        return courseApi.getCourses().then(courses => {
            // dispatch an action once promise is resolved (i.e. response returned from api)
            dispatch(loadCoursesSuccess(courses));
        }).catch(error => {
            throw error;
        });
    };
}