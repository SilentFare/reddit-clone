import { connect } from 'react-redux';

import { Post } from './Post';
import { upvote, downvote } from '../../ducks/posts';

const mapStateToProps = state => ({});

const mapDispatchToProps = { upvote, downvote };

export default connect(mapStateToProps, mapDispatchToProps)(Post);
