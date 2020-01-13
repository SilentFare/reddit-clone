import { connect } from 'react-redux';

import { Sidebar } from './Sidebar';
import { toggleSidebar } from '../../ducks/modals';

const mapStateToProps = state => ({
  show: state.modals.sidebar
});

const mapDispatchToProps = { toggleSidebar };

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
