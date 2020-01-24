import { connect } from 'react-redux';

import { PostCard } from './PostCard';
import { upvote, downvote } from '../../ducks/posts';

const mapStateToProps = state => ({});

const mapDispatchToProps = { upvote, downvote };

export default connect(mapStateToProps, mapDispatchToProps)(PostCard);
