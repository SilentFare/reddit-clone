import { connect } from 'react-redux';

import { CommentEditor } from './CommentEditor';
import { toggleRegister, toggleLogin } from '../../ducks/modals';

const mapStateToProps = state => ({
  auth: state.user.auth,
  fetching: state.user.fetching
});

const mapDispatchToProps = {
  toggleRegister,
  toggleLogin
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentEditor);
