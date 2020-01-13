import { connect } from 'react-redux';

import { LoginModal } from './LoginModal';
import { toggleLogin, toggleRegister } from '../../ducks/modals';

const mapStateToProps = state => ({
  show: state.modals.login
});

const mapDispatchToProps = { toggleLogin, toggleRegister };

export default connect(mapStateToProps, mapDispatchToProps)(LoginModal);
