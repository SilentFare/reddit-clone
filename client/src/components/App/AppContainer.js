import { connect } from 'react-redux';

import { App } from './App';
import { refreshToken, getSession } from '../../ducks/user';
const mapStateToProps = state => ({});

const mapDispatchToProps = { refreshToken, getSession };

export default connect(mapStateToProps, mapDispatchToProps)(App);
