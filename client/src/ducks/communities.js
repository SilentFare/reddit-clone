// Action types
const TOGGLE_COMMUNITIES_FETCHING = 'TOGGLE_COMMUNITIES_FETCHING';

// Action creators
const toggleCommunitiesFetching = () => ({
  type: TOGGLE_COMMUNITIES_FETCHING
});

export const fetchCommunities = () => async dispatch => {
  dispatch(toggleCommunitiesFetching());
  try {
    const response = await fetch('/api/communities', {
      method: 'GET'
    });
    if (response.ok) {
      const responseData = await response.json();
      console.log('Data', responseData);
    }
  } catch (error) {
    console.log(error);
  }
  dispatch(toggleCommunitiesFetching());
};

const initialState = {
  fetching: false
};
// Reducer
export const communities = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_COMMUNITIES_FETCHING:
      return {
        ...state,
        fetching: !state.fetching
      };
    default:
      return state;
  }
};
