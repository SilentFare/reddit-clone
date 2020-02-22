// Action types
const RECEIVE_POST_COMMENTS = 'RECEIVE_POST_COMMENTS';
export const RECEIVE_POST_COMMENT = 'RECEIVE_POST_COMMENT';
const RECEIVE_COMMENT_VOTE = 'RECEIVE_COMMENT_VOTE';

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

const receiveCommentVote = (data, post_id) => ({
  type: RECEIVE_COMMENT_VOTE,
  data,
  post_id
});

// Async action creators
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
    const token = localStorage.getItem('token');
    const opts = {
      method: 'GET'
    };
    if (token) {
      opts.headers = {
        authorization: `Bearer ${token}`
      };
    }
    const response = await fetch(`/api/comments/post/${post_id}`, opts);
    if (response.ok) {
      const responseData = await response.json();
      dispatch(receivePostComments(responseData.comments, post_id));
    }
  } catch (error) {
    console.error(error);
  }
};

export const upvote = (comment_id, post_id) => async dispatch => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch('/api/comments/upvote', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        comment_id
      })
    });
    if (response.ok) {
      const responseData = await response.json();
      dispatch(receiveCommentVote(responseData, post_id));
      console.log(responseData);
    }
  } catch (error) {
    console.error(error);
  }
};

export const downvote = (comment_id, post_id) => async dispatch => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch('/api/comments/downvote', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        comment_id
      })
    });
    if (response.ok) {
      const responseData = await response.json();
      dispatch(receiveCommentVote(responseData, post_id));
    }
  } catch (error) {
    console.error(error);
  }
};

const post = (
  state = { comments: {}, invalidate: false, fetching: true },
  action
) => {
  switch (action.type) {
    case RECEIVE_POST_COMMENTS:
      return {
        comments: action.comments.reduce((acc, curr) => {
          acc[curr.id] = curr;
          return acc;
        }, {}),
        invalidate: false,
        fetching: false
      };
    case RECEIVE_POST_COMMENT:
      return {
        ...state,
        comments: {
          ...state.comments,
          [action.comment.id]: action.comment
        }
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
    case RECEIVE_COMMENT_VOTE:
      let commentVoteState = {
        ...state
      };
      const { post_id, data } = action;
      if (commentVoteState.byPost[post_id]) {
        let temp;
        switch (data.action) {
          case 'create':
            temp = {
              vote: data.vote.vote,
              upvotes:
                commentVoteState.byPost[post_id].comments[data.vote.comment_id]
                  .upvotes + (data.vote.vote ? 1 : -1)
            };
            break;
          case 'update':
            temp = {
              vote: data.vote.vote,
              upvotes:
                commentVoteState.byPost[post_id].comments[data.vote.comment_id]
                  .upvotes + (data.vote.vote ? 2 : -2)
            };
            break;
          case 'delete':
            temp = {
              vote: null,
              upvotes:
                commentVoteState.byPost[post_id].comments[data.vote.comment_id]
                  .upvotes + (data.vote.vote ? -1 : 1)
            };
            break;
          default:
            return;
        }
        commentVoteState = {
          ...commentVoteState,
          byPost: {
            [post_id]: {
              ...commentVoteState.byPost[post_id],
              comments: {
                ...commentVoteState.byPost[post_id].comments,
                [data.vote.comment_id]: {
                  ...commentVoteState.byPost[post_id].comments[
                    data.vote.comment_id
                  ],
                  ...temp
                }
              }
            }
          }
        };
      }
      return commentVoteState;
    default:
      return state;
  }
};
