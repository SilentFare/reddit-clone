import decode from 'jwt-decode';

import { toggleRegister, toggleLogin } from './modals';

// Action types
const TOGGLE_USER_FETCHING = 'TOGGLE_USER_FETCHING';
const RECEIVE_SESSION = 'RECEIVE_SESSION';
const CLEAR_SESSION = 'CLEAR_SESSION';
const LOGOUT = 'LOGOUT';

// Action creators
const toggleFetching = () => ({
  type: TOGGLE_USER_FETCHING
});

const receiveSession = session => ({
  type: RECEIVE_SESSION,
  session
});

const clearSession = () => ({
  type: CLEAR_SESSION
});

export const register = (data, clearForm) => async dispatch => {
  dispatch(toggleFetching());
  try {
    const response = await fetch('/api/users/register', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (response.ok) {
      const responseData = await response.json();
      localStorage.setItem('token', responseData.token);
      dispatch(receiveSession(responseData.user));
      dispatch(toggleRegister());
      clearForm();
    }
  } catch (error) {
    console.log(error);
  }
};

export const login = (data, clearForm) => async dispatch => {
  dispatch(toggleFetching());
  try {
    const response = await fetch('/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    if (response.ok) {
      const responseData = await response.json();
      localStorage.setItem('token', responseData.token);
      dispatch(receiveSession(responseData.user));
      dispatch(toggleLogin());
      clearForm();
    }
  } catch (error) {
    console.log(error);
  }
};

export const logout = () => async dispatch => {
  try {
    const response = await fetch('/api/users/logout', {
      method: 'GET',
      credentials: 'include'
    });
    if (response.ok) {
      dispatch(clearSession());
      localStorage.removeItem('token');
    }
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
      const { token } = responseData;
      const decodedToken = decode(token);
      localStorage.setItem('token', token);
      setTimeout(async () => {
        // When the token expires, fetch new access token
        dispatch(refreshToken());
      }, decodedToken.exp * 1000 - Date.now() - 1000);
    } else {
      localStorage.removeItem('token');
      dispatch(logout());
    }
  } catch (error) {
    console.log(error);
  }
};

export const getSession = () => async dispatch => {
  try {
    const token = localStorage.getItem('token');
    if (token) {
      const response = await fetch('/api/users', {
        method: 'GET',
        headers: {
          authorization: `Bearer ${token}`
        }
      });
      if (response.ok) {
        const responseData = await response.json();
        dispatch(receiveSession(responseData.user));
      } else {
        // Error
      }
    }
  } catch (error) {
    console.log(error);
  }
  // dispatch(toggleFetching());
};

const initialState = {
  session: {},
  auth: false,
  fetching: true
};
// Reducer
export const user = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_USER_FETCHING:
      return {
        ...state,
        fetching: !state.fetching
      };
    case RECEIVE_SESSION:
      return {
        session: action.session,
        auth: !!action.session,
        fetching: false
      };
    case CLEAR_SESSION:
      return {
        ...initialState,
        fetching: false
      };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};
