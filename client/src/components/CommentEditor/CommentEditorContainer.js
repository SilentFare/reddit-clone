import { connect } from 'react-redux';

import { CommentEditor } from './CommentEditor';
import { toggleRegister, toggleLogin } from '../../ducks/modals';
import { create } from '../../ducks/comments';

const mapStateToProps = state => ({
  auth: state.user.auth,
  fetching: state.user.fetching
});

const mapDispatchToProps = {
  toggleRegister,
  toggleLogin,
  create
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentEditor);
