// Action types
const RECEIVE_SESSION = 'RECEIVE_SESSION';
const LOGOUT = 'LOGOUT';

// Action creators
const receiveSession = session => ({
  type: RECEIVE_SESSION,
  session
});

export const register = data => async dispatch => {
  try {
    const response = await fetch('/api/users/register', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const responseData = await response.json();
    localStorage.setItem('token', responseData.token);
    dispatch(receiveSession(responseData.user));
  } catch (error) {
    console.log(error);
  }
};

export const refreshToken = () => async dispatch => {
  try {
    const response = await fetch('/api/users/refresh_token', {
      method: 'GET',
      credentials: 'include'
    });
    if (response.ok) {
      const responseData = await response.json();
      localStorage.setItem('token', responseData.token);
    } else {
    }
  } catch (error) {
    console.log(error);
  }
};

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
