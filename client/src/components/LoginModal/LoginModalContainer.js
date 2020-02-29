import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { LoginModal } from './LoginModal';
import { toggleLogin, toggleRegister } from '../../ducks/modals';
import { login } from '../../ducks/user';

const mapStateToProps = state => ({
  show: state.modals.login
});

const mapDispatchToProps = { toggleLogin, toggleRegister, login };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(LoginModal));
