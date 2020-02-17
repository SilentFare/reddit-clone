import { connect } from 'react-redux';

import { Discussion } from './Discussion';
import { fetchPostDiscussion } from '../../ducks/posts';
import { fetchPostComments } from '../../ducks/comments';

const mapStateToProps = state => ({
  postsById: state.posts.byId,
  commentsByPost: state.comments.byPost
});

const mapDispatchToProps = { fetchPostDiscussion, fetchPostComments };

export default connect(mapStateToProps, mapDispatchToProps)(Discussion);
