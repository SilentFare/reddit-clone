import { connect } from 'react-redux';

import { Comment } from './Comment';
import { upvote, downvote } from '../../ducks/comments';

const mapStateToProps = state => ({});

const mapDispatchToProps = { upvote, downvote };

export default connect(mapStateToProps, mapDispatchToProps)(Comment);
