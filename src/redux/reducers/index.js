// this is a root reducer
// combine different reducers in our application together

import { combineReducers } from 'redux';
import courses from './courseReducers';

const rootReducer = combineReducers({
    courses
});

export default rootReducer;