// Action types
const TOGGLE_POSTS_FETCHING = 'TOGGLE_POSTS_FETCHING';
const SELECT_COMMUNITY = 'SELECT_COMMUNITY';
const INVALIDATE_POSTS = 'INVALIDATE_POSTS';
const RECEIVE_POSTS = 'RECEIVE_POSTS';

// Action creators
export const togglePostsFetching = () => ({
  type: TOGGLE_POSTS_FETCHING
});

export const selectCommunity = community => ({
  type: SELECT_COMMUNITY,
  community
});

export const receivePosts = (community, posts) => ({
  type: RECEIVE_POSTS,
  community,
  posts
});

export const invalidatePosts = community => ({
  type: INVALIDATE_POSTS,
  community
});

export const fetchPosts = community => async dispatch => {
  try {
    const response = await fetch(`/api/posts/${community ? community : ''}`, {
      method: 'GET'
    });
    if (response.ok) {
      const responseData = await response.json();
      dispatch(receivePosts(community, responseData.posts));
      dispatch(togglePostsFetching());
    }
  } catch (error) {
    console.log(error);
  }
};

// Community posts reducer
const community = (state = { byId: {}, invalidate: false }, action) => {
  switch (action.type) {
    case RECEIVE_POSTS:
      const posts = action.posts.reduce((obj, post) => {
        obj[post.id] = post;
        return obj;
      }, {});
      return {
        ...state,
        invalidate: false,
        byId: posts
      };
    case INVALIDATE_POSTS:
      return {
        ...state,
        invalidate: true
      };
    default:
      return state;
  }
};

const initialState = {
  byCommunity: {},
  fetching: true
};
// Reducer
export const posts = (state = initialState, action) => {
  switch (action.type) {
    case SELECT_COMMUNITY:
      return {
        ...state,
        selectedCommunity: action.community
      };
    case TOGGLE_POSTS_FETCHING:
      return {
        ...state,
        fetching: !state.fetching
      };
    case RECEIVE_POSTS:
    case INVALIDATE_POSTS:
      if (action.community) {
        return {
          ...state,
          byCommunity: {
            ...state.byCommunity,
            [action.community]: community(
              state.byCommunity[action.community],
              action
            )
          }
        };
      } else {
        return {
          ...state,
          all: community(state.all, action)
        };
      }
    default:
      return state;
  }
};
