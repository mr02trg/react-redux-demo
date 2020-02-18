import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { loadCourses, saveCourse } from '../../redux/actions/courseActions';
import { loadAuthors } from '../../redux/actions/authorActions';

import CourseForm from './CourseForm';

// destructuring props at function definition
function ManageCoursePage({ 
    courses, 
    authors, 
    loadCourses,
    saveCourse,
    loadAuthors,
    history,
    ...props }) 
{
    // local state should be handled by react rather than redux state
    // redux state is for global value state management
    // WHO CARES ABOUT THIS DATA????
    const [course, setCourse] = useState({...props.course});
    const [errors, setErrors] = useState({});

    // note the empty list will only run useEffect once (at the time the component mounted)
    // this is equivalent to componentDidMount
    // this list indicates to run useEffect() everytime a props specified in the list change
    useEffect(() => {
        if (courses.length === 0) {
            loadCourses().catch(error => {
                alert("Loading courses failed " + error);
            })
        } else {
            setCourse({ ...props.course});
        }

        if (authors.length === 0) {
            loadAuthors().catch(error => {
                alert("Loading authors failed " + error);
            });
        }
    }, [props.course])

    const handleChange = (event) => {

        // this destructuring is cool!!
        const {name, value} = event.target;
        setCourse( prevCourse => ({
            ...prevCourse,
            [name]: name === "authorId" ? parseInt(value, 10) : value            
        }));
    }

    const handleSave = (event) => {
        event.preventDefault();
        saveCourse(course).then(() => {
            // any component that is loaded via react-router will get the history props passed in automatically
            history.push("/courses");
        })
    }

    return (
        <>
            <CourseForm 
                course={course} 
                errors={errors} 
                authors={authors} 
                onChange={handleChange}
                onSave={handleSave}  />
        </>
    )
}

export function getCourseBySlug(courses, slug) {
    return courses.find(c => c.slug === slug) || null;
}

function mapStateToProps(state, ownProps) {
    const slug = ownProps.match.params.slug;   
    const newCourse =  {
        id: null,
        title: "",
        authorId: null,
        category: ""
    };
    const course = slug ? getCourseBySlug(state.courses, slug) : newCourse;
    return {
        course,
        courses: state.authors.length === 0 ? [] :
        state.courses.map(course => {
            return {
                ...course,
                authorName: state.authors.find(x => x.id === course.authorId).name
            }
        }),
        authors: state.authors
    }
}

// object form implementation of dispatchToProps
const mapDispatchToProps = {
    loadCourses,
    loadAuthors,
    saveCourse
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ManageCoursePage);