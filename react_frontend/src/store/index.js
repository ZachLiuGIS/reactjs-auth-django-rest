import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from '../reducers';
// import DevTools from '../containers/DevTools';

function configureStore(initialState) {
    let createStoreWithMiddleware;

    const logger = createLogger();
    const middleware = applyMiddleware(thunk, logger);

    createStoreWithMiddleware = compose(
        middleware,
        // DevTools.instrument()
    );

    return createStoreWithMiddleware(createStore)(rootReducer, initialState);
}

let store = configureStore();

export default store;