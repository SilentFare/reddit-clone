import reduxThunk from 'redux-thunk';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';

import { user } from './user';
import { communities } from './communities';
import { modals } from './modals';
import { posts } from './posts';
import { comments } from './comments';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middlewares = [reduxThunk];

const rootReducer = combineReducers({
  user,
  communities,
  posts,
  comments,
  modals
});

export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(...middlewares))
);
