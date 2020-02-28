import { RECEIVE_POST_COMMENT } from './comments';
// Action types
const TOGGLE_POSTS_FETCHING = 'TOGGLE_POSTS_FETCHING';
const TOGGLE_POST_FETCHING = 'TOGGLE_POST_FETCHING';
const SELECT_COMMUNITY = 'SELECT_COMMUNITY';
const INVALIDATE_POSTS = 'INVALIDATE_POSTS';
const RECEIVE_POSTS = 'RECEIVE_POSTS';
const RECEIVE_POST_VOTE = 'RECEIVE_POST_VOTE';
const RECEIVE_POST_DISCUSSION = 'RECEIVE_POST_DISCUSSION';
const RECEIVE_USER_POSTS = 'RECEIVE_USER_POSTS';
const TOGGLE_USER_POSTS_FETCHING = 'TOGGLE_USER_POSTS_FETCHING';
const INVALIDATE_USER_POSTS = 'INVALIDATE_USER_POSTS';

// Action creators
export const togglePostsFetching = community => ({
  type: TOGGLE_POSTS_FETCHING,
  community
});

export const togglePostFetching = post_id => ({
  type: TOGGLE_POST_FETCHING,
  post_id
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

export const receivePostVote = (data, community) => ({
  type: RECEIVE_POST_VOTE,
  data,
  community
});

export const receivePostDiscussion = post => ({
  type: RECEIVE_POST_DISCUSSION,
  post
});

export const receiveUserPosts = (posts, user) => ({
  type: RECEIVE_USER_POSTS,
  posts,
  user
});

// Async action creators
export const fetchPosts = community => async dispatch => {
  try {
    // Get the access token from the local storage.
    const token = localStorage.getItem('token');
    // If we have a community name, then fetch posts only from it. Otherwise fetch posts from any community.
    const url = `/api/posts/${community ? `community/${community}` : ''}`;
    // Set initial options of the fetch function
    const opts = {
      method: 'GET'
    };
    // If we have an access token, then set it as authorization header
    if (token) {
      opts.headers = {
        authorization: `Bearer ${token}`
      };
    }
    // Wait for the response
    const response = await fetch(url, opts);
    // If the request was successful,...
    if (response.ok) {
      // ...then convert the response to JSON data
      const responseData = await response.json();
      // Save the posts to the redux state
      dispatch(receivePosts(community, responseData.posts));
    }
  } catch (error) {
    console.log(error);
  }
};

export const fetchPostDiscussion = post_id => async dispatch => {
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
    const response = await fetch(`/api/posts/${post_id}`, opts);
    if (response.ok) {
      const responseData = await response.json();
      dispatch(receivePostDiscussion(responseData.post));
    }
  } catch (error) {
    console.log(error);
  }
};

export const fetchUserPosts = userName => async dispatch => {
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
    const response = await fetch(`/api/posts/user/${userName}`, opts);
    if (response.ok) {
      const responseData = await response.json();
      dispatch(receiveUserPosts(responseData.posts, userName));
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
      dispatch(receivePostVote(responseData, community));
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
      dispatch(receivePostVote(responseData, community));
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
      console.log(responseData);
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

const user = (
  state = { byId: {}, invalidate: false, fetching: true },
  action
) => {
  switch (action.type) {
    case TOGGLE_USER_POSTS_FETCHING:
      return {
        ...state,
        fetching: !state.fetching
      };
    case RECEIVE_USER_POSTS:
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
    case INVALIDATE_USER_POSTS:
      return {
        ...state,
        invalidate: true
      };
    default:
      return state;
  }
};

const post = (
  state = { post: {}, invalidate: false, fetching: true },
  action
) => {
  switch (action.type) {
    case RECEIVE_POST_DISCUSSION:
      return {
        post: action.post,
        fetching: false,
        invalidate: false
      };
    default:
      return state;
  }
};

const initialState = {
  byId: {},
  byCommunity: {},
  byUser: {}
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
    case RECEIVE_POST_VOTE:
      const { data } = action;
      let receiveUpvoteState = {
        ...state
      };
      if (
        receiveUpvoteState.all &&
        receiveUpvoteState.all.byId[data.vote.post_id]
      ) {
        let temp;
        switch (data.action) {
          case 'create':
            temp = {
              vote: data.vote.vote,
              upvotes:
                receiveUpvoteState.all.byId[data.vote.post_id].upvotes +
                (data.vote.vote ? 1 : -1)
            };
            break;
          case 'update':
            temp = {
              vote: data.vote.vote,
              upvotes:
                receiveUpvoteState.all.byId[data.vote.post_id].upvotes +
                (data.vote.vote ? 2 : -2)
            };
            break;
          case 'delete':
            temp = {
              vote: null,
              upvotes:
                receiveUpvoteState.all.byId[data.vote.post_id].upvotes +
                (data.vote.vote ? -1 : 1)
            };
            break;
          default:
            return;
        }
        receiveUpvoteState = {
          ...receiveUpvoteState,
          all: {
            ...receiveUpvoteState.all,
            byId: {
              ...receiveUpvoteState.all.byId,
              [data.vote.post_id]: {
                ...receiveUpvoteState.all.byId[data.vote.post_id],
                ...temp
              }
            }
          }
        };
      }
      if (
        receiveUpvoteState.byCommunity[action.community] &&
        receiveUpvoteState.byCommunity[action.community].byId[data.vote.post_id]
      ) {
        let temp;
        switch (data.action) {
          case 'create':
            temp = {
              vote: data.vote.vote,
              upvotes:
                receiveUpvoteState.byCommunity[action.community].byId[
                  data.vote.post_id
                ].upvotes + (data.vote.vote ? 1 : -1)
            };
            break;
          case 'update':
            temp = {
              vote: data.vote.vote,
              upvotes:
                receiveUpvoteState.byCommunity[action.community].byId[
                  data.vote.post_id
                ].upvotes + (data.vote.vote ? 2 : -2)
            };
            break;
          case 'delete':
            temp = {
              vote: null,
              upvotes:
                receiveUpvoteState.byCommunity[action.community].byId[
                  data.vote.post_id
                ].upvotes + (data.vote.vote ? -1 : 1)
            };
            break;
          default:
            return;
        }
        receiveUpvoteState = {
          ...receiveUpvoteState,
          byCommunity: {
            ...receiveUpvoteState.byCommunity,
            [action.community]: {
              ...receiveUpvoteState.byCommunity[action.community],
              byId: {
                ...receiveUpvoteState.byCommunity[action.community].byId,
                [data.vote.post_id]: {
                  ...receiveUpvoteState.byCommunity[action.community].byId[
                    data.vote.post_id
                  ],
                  ...temp
                }
              }
            }
          }
        };
      }
      if (receiveUpvoteState.byId[data.vote.post_id]) {
        let temp;
        switch (data.action) {
          case 'create':
            temp = {
              vote: data.vote.vote,
              upvotes:
                receiveUpvoteState.byId[data.vote.post_id].post.upvotes +
                (data.vote.vote ? 1 : -1)
            };
            break;
          case 'update':
            temp = {
              vote: data.vote.vote,
              upvotes:
                receiveUpvoteState.byId[data.vote.post_id].post.upvotes +
                (data.vote.vote ? 2 : -2)
            };
            break;
          case 'delete':
            temp = {
              vote: null,
              upvotes:
                receiveUpvoteState.byId[data.vote.post_id].post.upvotes +
                (data.vote.vote ? -1 : 1)
            };
            break;
          default:
            return;
        }
        receiveUpvoteState = {
          ...receiveUpvoteState,
          byId: {
            ...receiveUpvoteState.byId,
            [data.vote.post_id]: {
              ...receiveUpvoteState.byId[data.vote.post_id],
              post: {
                ...receiveUpvoteState.byId[data.vote.post_id].post,
                ...temp
              }
            }
          }
        };
      }
      return receiveUpvoteState;
    case RECEIVE_POST_DISCUSSION:
      // Create new post discussion entry
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.post.id]: post(state.byId[action.post.id], action)
        }
      };
    case RECEIVE_POST_COMMENT:
      // Create copy of the state, instead of directly mutating it
      const postCommentState = { ...state };
      // Increase the comment counter of the post by 1
      postCommentState.byId[action.comment.post_id].post.comments += 1;
      // If we have the post in a community,...
      if (
        action.community in postCommentState.byCommunity &&
        postCommentState.byCommunity[action.community].byId[
          action.comment.post_id
        ]
      ) {
        // ...then increase the comment counter of the post by 1
        postCommentState.byCommunity[action.community].byId[
          action.comment.post_id
        ].comments += 1;
      }
      // If we have the post on the home page,...
      if (
        postCommentState.all &&
        postCommentState.all.byId[action.comment.post_id]
      ) {
        // ...then increase the comment counter of the post by 1
        postCommentState.all.byId[action.comment.post_id].comments += 1;
      }
      return postCommentState;
    case RECEIVE_USER_POSTS:
      return {
        ...state,
        byUser: {
          ...state.byUser,
          [action.user]: user(state.byUser[action.user], action)
        }
      };
    default:
      return state;
  }
};
