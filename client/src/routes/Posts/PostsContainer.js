import { connect } from 'react-redux';

import { Posts } from './Posts';
import { fetchPosts } from '../../ducks/posts';

const mapStateToProps = state => ({
  posts: state.posts
});

const mapDispatchToProps = { fetchPosts };

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
