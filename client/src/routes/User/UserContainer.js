import { connect } from 'react-redux';

import { User } from './User';
import { fetchUserPosts } from '../../ducks/posts';
import { fetchUserComments } from '../../ducks/comments';

const mapStateToProps = state => ({
  postsByUser: state.posts.byUser,
  commentsByUser: state.comments.byUser
});

const mapDispatchToProps = { fetchUserPosts, fetchUserComments };

export default connect(mapStateToProps, mapDispatchToProps)(User);
