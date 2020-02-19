// Action types
const TOGGLE_COMMUNITIES_FETCHING = 'TOGGLE_COMMUNITIES_FETCHING';
const RECEIVE_COMMUNITIES = 'RECEIVE_COMMUNITIES';

// Action creators
const toggleCommunitiesFetching = () => ({
  type: TOGGLE_COMMUNITIES_FETCHING
});

const receiveCommunities = communities => ({
  type: RECEIVE_COMMUNITIES,
  communities
});

export const fetchCommunities = () => async dispatch => {
  try {
    const response = await fetch('/api/communities', {
      method: 'GET'
    });
    if (response.ok) {
      const responseData = await response.json();
      dispatch(receiveCommunities(responseData.communities));
    }
  } catch (error) {
    console.log(error);
  }
};

const initialState = {
  byId: {},
  fetching: true
};
// Reducer
export const communities = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_COMMUNITIES_FETCHING:
      return {
        ...state,
        fetching: !state.fetching
      };
    case RECEIVE_COMMUNITIES:
      const communities = action.communities.reduce((obj, com) => {
        obj[com.id] = com;
        return obj;
      }, {});
      return {
        ...state,
        byId: communities,
        fetching: false
      };
    default:
      return state;
  }
};
