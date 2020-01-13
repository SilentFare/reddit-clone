// Action types
const RECEIVE_SESSION = 'RECEIVE_SESSION';
const LOGOUT = 'LOGOUT';

// Action creators
export const receiveSession = session => ({
  type: RECEIVE_SESSION,
  session
});

const initialState = {
  session: {},
  auth: false,
  fetching: false
};
// Reducer
export const user = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_SESSION:
      return {
        session: action.session,
        auth: !!action.session
      };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};
