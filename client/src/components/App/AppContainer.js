import { connect } from 'react-redux';

import { App } from './App';
import { refreshToken } from '../../ducks/user';
const mapStateToProps = state => ({});

const mapDispatchToProps = { refreshToken };

export default connect(mapStateToProps, mapDispatchToProps)(App);
