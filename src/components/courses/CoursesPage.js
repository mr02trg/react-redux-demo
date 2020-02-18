import React from 'react';
import { connect } from 'react-redux';
import * as courseActions from '../../redux/actions/courseActions';
import * as authorActions from '../../redux/actions/authorActions';
import { bindActionCreators } from 'redux';
import CourseList from './CourseList';

class CoursesPage extends React.Component {

    constructor() {
        super();
        this.state = {
            course: {
                title: ""
            }
        };
    }

    // load courses from api when component is mounted
    componentDidMount() {
        this.props.actions.loadCourses().catch(error => {
            alert("Loading courses failed " + error);
        })

        this.props.actions.loadAuthors().catch(error => {
            alert("Loading authors failed " + error);
        });
    }


    handleChange = (event) => {
        const updatedCourse = {...this.state.course, title: event.target.value};
        this.setState({course: updatedCourse});
    }

    handleSubmit = (event) => {
        event.preventDefault();
        console.log(this.state);
        // if we do not declare mapDispatchToProps in our redux connection
        // this.props.dispatch(courseActions.createCourse(this.state.course))

        // debugger;
        // this.props.createCourse(this.state.course);
        this.props.actions.createCourse(this.state.course);
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <h2>Courses</h2>
                    <h3>Add Course</h3>
                    <div className="form-group">
                        <input
                            type="text"
                            onChange={this.handleChange}
                            value={this.state.course.title}
                        /> 
                    </div>
                    <button className="btn btn-primary">Save</button>
                </form>
                {/* {this.props.courses.map(x => (<div key={x.title}>{x.title}</div>) )} */}
                <CourseList courses={this.props.courses} />
            </div>
        )
    }
}

// this weird syntax means we call 2 funcitons right after the other
// 1st call connect() then our component

// if we do not declare mapDispatchToProps, 
// react is going to automatically adds Dispatch as a prop of this component
export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);

// this functions declare what state is passed to our component via props
// BE SPECIFIC which data is exposed to the component, 
// otherwise your component is going to re-render everytime the data is changed in the store

// own props refer to the props that attached to this component
// redux is gonna 'notify' the component via its props when there is a data change
// NOTE: state here refer to "new state" returned from redux store, not the component internal state
function mapStateToProps(state, ownProps) {
    // debugger;
    return {
        courses: 
        state.authors.length === 0 ?
        [] :
        state.courses.map(course => {
            return {
                ...course,
                authorName: state.authors.find(x => x.id === course.authorId).name
            }
        }),
        authors: state.authors
    }
}


// this function declare which action we want to expose on our component to redux store
function mapDispatchToProps(dispatch) {
    return {
        // METHOD 2:
        // this will only bind createCourse to dispatch
        // createCourse: course => dispatch(courseActions.createCourse(course))

        // METHOD 3 - this is by far the best method
        // bind all courseAction methods to dispatch
        actions: {
            loadCourses: bindActionCreators(courseActions.loadCourses, dispatch),
            loadAuthors: bindActionCreators(authorActions.loadAuthors, dispatch)
        } 
    }
}