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

export function updateCourseSuccess(course) {
    return {type: types.UPDATE_COURSE_SUCCESS, course };
}

export function createCourseSuccess(course) {
    return {type: types.CREATE_COURSE_SUCCESS, course};
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

export function saveCourse(course) {
    return dispatch => {
        return courseApi.saveCourse(course).then(savedCourse => {
            course.id
                ? dispatch(updateCourseSuccess(savedCourse)) 
                : dispatch(createCourseSuccess(savedCourse));
        }).catch(error => {
            throw error;
        });
    };
}