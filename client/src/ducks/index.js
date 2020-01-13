import reduxThunk from 'redux-thunk';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';

import { user } from './user';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middlewares = [reduxThunk];

const rootReducer = combineReducers({
  user
});

export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(...middlewares))
);
