// Action types
const TOGGLE_REGISTER = 'TOGGLE_REGISTER';
const TOGGLE_LOGIN = 'TOGGLE_LOGIN';
const TOGGLE_SIDEBAR = 'TOGGLE_SIDEBAR';

// Action creators
export const toggleRegister = () => ({
  type: TOGGLE_REGISTER
});

export const toggleLogin = () => ({
  type: TOGGLE_LOGIN
});

export const toggleSidebar = () => ({
  type: TOGGLE_SIDEBAR
});

const initialState = {
  register: false,
  login: false,
  sidebar: false
};
// Reducer
export const modals = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_REGISTER:
      return {
        ...state,
        register: !state.register
      };
    case TOGGLE_LOGIN:
      return {
        ...state,
        login: !state.login
      };
    case TOGGLE_SIDEBAR:
      return {
        ...state,
        sidebar: !state.sidebar
      };
    default:
      return state;
  }
};
