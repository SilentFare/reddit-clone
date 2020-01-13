import { connect } from 'react-redux';

import { Header } from './Header';
import { toggleRegister } from '../../ducks/modals';

const mapStateToProps = state => ({});

const mapDispatchToProps = { toggleRegister };

export default connect(mapStateToProps, mapDispatchToProps)(Header);
