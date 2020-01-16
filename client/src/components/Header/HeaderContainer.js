import { connect } from 'react-redux';

import { Header } from './Header';
import { toggleRegister, toggleLogin, toggleSidebar } from '../../ducks/modals';
import { logout } from '../../ducks/user';

const mapStateToProps = state => ({
  auth: state.user.auth,
  fetching: state.user.fetching
});

const mapDispatchToProps = {
  toggleRegister,
  toggleLogin,
  toggleSidebar,
  logout
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
