import { connect } from 'react-redux';

import { ReplyEditor } from './ReplyEditor';
import { create } from '../../ducks/comments';

const mapStateToProps = state => ({});

const mapDispatchToProps = { create };

export default connect(mapStateToProps, mapDispatchToProps)(ReplyEditor);
