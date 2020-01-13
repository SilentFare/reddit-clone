import { connect } from 'react-redux';

import { RegisterModal } from './RegisterModal';
import { toggleRegister } from '../../ducks/modals';

const mapStateToProps = state => ({
  show: state.modals.register
});

const mapDispatchToProps = { toggleRegister };

export default connect(mapStateToProps, mapDispatchToProps)(RegisterModal);
