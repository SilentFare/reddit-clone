import { connect } from 'react-redux';

import { CreatePost } from './CreatePost';
import { createPost } from '../../ducks/posts';

const mapStateToProps = state => ({});

const mapDispatchToProps = { createPost };

export default connect(mapStateToProps, mapDispatchToProps)(CreatePost);
