// Action types
const RECEIVE_POST_COMMENTS = 'RECEIVE_POST_COMMENTS';
export const RECEIVE_POST_COMMENT = 'RECEIVE_POST_COMMENT';

// Action creators
const receivePostComments = (comments, post_id) => ({
  type: RECEIVE_POST_COMMENTS,
  comments,
  post_id
});

const receivePostComment = (comment, community) => ({
  type: RECEIVE_POST_COMMENT,
  comment,
  community
});

export const create = data => async dispatch => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch('/api/comments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`
      },
      body: JSON.stringify(data)
    });
    if (response.ok) {
      const responseData = await response.json();
      dispatch(receivePostComment(responseData.comment, data.community));
    } else {
    }
  } catch (error) {
    console.error(error);
  }
};

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
    case RECEIVE_POST_COMMENT:
      return {
        ...state,
        comments: state.comments.concat(action.comment)
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
    case RECEIVE_POST_COMMENT:
      return {
        ...state,
        byPost: {
          ...state.byPost,
          [action.comment.post_id]: post(
            state.byPost[action.comment.post_id],
            action
          )
        }
      };
    default:
      return state;
  }
};
