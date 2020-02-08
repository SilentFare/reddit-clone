import { connect } from 'react-redux';

import { Discussion } from './Discussion';
import { fetchDiscussion } from '../../ducks/posts';

const mapStateToProps = state => ({});

const mapDispatchToProps = { fetchDiscussion };

export default connect(mapStateToProps, mapDispatchToProps)(Discussion);
