import { connect } from 'react-redux';

import { Header } from './Header';
import { toggleRegister, toggleLogin, toggleSidebar } from '../../ducks/modals';

const mapStateToProps = state => ({});

const mapDispatchToProps = { toggleRegister, toggleLogin, toggleSidebar };

export default connect(mapStateToProps, mapDispatchToProps)(Header);
