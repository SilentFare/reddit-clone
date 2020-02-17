// Action types
const RECEIVE_POST_COMMENTS = 'RECEIVE_POST_COMMENTS';

// Action creators
const receivePostComments = (comments, post_id) => ({
  type: RECEIVE_POST_COMMENTS,
  comments,
  post_id
});

export const fetchPostComments = post_id => async dispatch => {
  try {
    const response = await fetch(`/api/comments/post/${post_id}`);
    if (response.ok) {
      const responseData = await response.json();
      dispatch(receivePostComments(responseData.comments, post_id));
    }
  } catch (error) {
    console.error(error);
  }
};

const post = (
  state = { comments: [], invalidate: false, fetching: true },
  action
) => {
  switch (action.type) {
    case RECEIVE_POST_COMMENTS:
      return {
        comments: action.comments,
        invalidate: false,
        fetching: false
      };
    default:
      return state;
  }
};

const initialState = { byPost: {} };
// Reducer
export const comments = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_POST_COMMENTS:
      return {
        ...state,
        byPost: {
          ...state.byPost,
          [action.post_id]: post(state.byPost[action.post_id], action)
        }
      };
    default:
      return state;
  }
};
