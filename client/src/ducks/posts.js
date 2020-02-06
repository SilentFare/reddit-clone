// Action types
const TOGGLE_POSTS_FETCHING = 'TOGGLE_POSTS_FETCHING';
const SELECT_COMMUNITY = 'SELECT_COMMUNITY';
const INVALIDATE_POSTS = 'INVALIDATE_POSTS';
const RECEIVE_POSTS = 'RECEIVE_POSTS';
const CREATE_VOTE = 'CREATE_VOTE';
const UPDATE_VOTE = 'UPDATE_VOTE';

// Action creators
export const togglePostsFetching = community => ({
  type: TOGGLE_POSTS_FETCHING,
  community
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

export const createVote = (vote, community) => ({
  type: CREATE_VOTE,
  vote,
  community
});

export const updateVote = (vote, community) => ({
  type: UPDATE_VOTE,
  vote,
  community
});

export const fetchPosts = community => async dispatch => {
  try {
    const token = localStorage.getItem('token');
    const url = `/api/posts/${community ? `community/${community}` : ''}`;
    const opts = {
      method: 'GET'
    };
    if (token) {
      opts.headers = {
        authorization: `Bearer ${token}`
      };
    }
    const response = await fetch(url, opts);
    if (response.ok) {
      const responseData = await response.json();
      dispatch(receivePosts(community, responseData.posts));
    }
  } catch (error) {
    console.log(error);
  }
};

export const upvote = (post_id, community) => async dispatch => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch('/api/posts/upvote', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        post_id
      })
    });
    if (response.ok) {
      const responseData = await response.json();
      console.log(responseData);
      switch (responseData.action) {
        case 'create':
          dispatch(createVote(responseData.vote, community));
          break;
        case 'update':
        case 'delete':
      }
    }
  } catch (error) {
    console.log(error);
  }
};

export const downvote = (post_id, community) => async dispatch => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch('/api/posts/downvote', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        post_id
      })
    });
    if (response.ok) {
      const responseData = await response.json();
      switch (responseData.action) {
        case 'create':
          dispatch(createVote(responseData.vote, community));
          break;
        case 'update':
          dispatch(updateVote(responseData.vote, community));
          break;
        case 'delete':
      }
    }
  } catch (error) {
    console.log(error);
  }
};

export const createPost = data => async dispatch => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch('/api/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`
      },
      body: JSON.stringify(data)
    });
    if (response.ok) {
      const responseData = await response.json();
    }
  } catch (error) {
    console.log(error);
  }
};

// Community posts reducer
const community = (
  state = { byId: {}, invalidate: false, fetching: true },
  action
) => {
  switch (action.type) {
    case TOGGLE_POSTS_FETCHING:
      return {
        ...state,
        fetching: !state.fetching
      };
    case RECEIVE_POSTS:
      const posts = action.posts.reduce((obj, post) => {
        obj[post.id] = post;
        return obj;
      }, {});
      return {
        ...state,
        invalidate: false,
        fetching: false,
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
  byCommunity: {}
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
    case CREATE_VOTE:
      let stateCopy = {
        ...state
      };
      if (state.all && state.all.byId[action.vote.post_id]) {
        const post = state.all.byId[action.vote.post_id];
        stateCopy = {
          all: {
            ...stateCopy.all,
            byId: {
              ...stateCopy.all.byId,
              [action.vote.post_id]: Object.assign({}, post, {
                vote: action.vote.vote,
                upvotes: action.vote.vote
                  ? post.upvotes === null
                    ? 1
                    : post.upvotes + 1
                  : post.upvotes === null
                  ? -1
                  : post.upvotes - 1
              })
            }
          }
        };
      }
      if (
        state.byCommunity[action.community] &&
        state.byCommunity[action.community].byId[action.vote.post_id]
      ) {
        const post =
          state.byCommunity[action.community].byId[action.vote.post_id];
        stateCopy = {
          byCommunity: {
            ...state.byCommunity,
            [action.community]: {
              ...state.byCommunity[action.community],
              byId: {
                ...state.byCommunity[action.community].byId,
                [action.vote.post_id]: {
                  ...post,
                  vote: action.vote.vote,
                  upvotes: action.vote.vote
                    ? post.upvotes === null
                      ? 1
                      : post.upvotes + 1
                    : post.upvotes === null
                    ? -1
                    : post.upvotes - 1
                }
              }
            }
          }
        };
      }
      return stateCopy;
    default:
      return state;
  }
};
