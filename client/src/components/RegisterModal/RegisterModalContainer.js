import { connect } from 'react-redux';

import { RegisterModal } from './RegisterModal';
import { toggleRegister, toggleLogin } from '../../ducks/modals';

const mapStateToProps = state => ({
  show: state.modals.register
});

const mapDispatchToProps = { toggleRegister, toggleLogin };

export default connect(mapStateToProps, mapDispatchToProps)(RegisterModal);
