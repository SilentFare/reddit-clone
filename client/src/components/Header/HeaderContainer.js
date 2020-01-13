import { connect } from 'react-redux';

import { Header } from './Header';
import { toggleRegister, toggleLogin } from '../../ducks/modals';

const mapStateToProps = state => ({});

const mapDispatchToProps = { toggleRegister, toggleLogin };

export default connect(mapStateToProps, mapDispatchToProps)(Header);
