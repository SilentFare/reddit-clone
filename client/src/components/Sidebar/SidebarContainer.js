import { connect } from 'react-redux';

import { Sidebar } from './Sidebar';
import { toggleSidebar } from '../../ducks/modals';
import { fetchCommunities } from '../../ducks/communities';

const mapStateToProps = state => ({
  show: state.modals.sidebar,
  communities: state.communities.byId
});

const mapDispatchToProps = { toggleSidebar, fetchCommunities };

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
