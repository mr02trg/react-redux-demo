// this function configure the store
// will be called at the application entry point 

import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './reducers';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';

export default function configureStore(initialState) {

    // add support for redux dev tool - installed on browser
    const composeEnhancers =
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    return createStore(
        rootReducer, 
        initialState , 
        composeEnhancers(applyMiddleware(reduxImmutableStateInvariant()))
    );
}