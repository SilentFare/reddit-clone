import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import decode from 'jwt-decode';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';

import styles from './App.module.css';
import Posts from '../../routes/Posts';
import Discussion from '../../routes/Discussion';
import Header from '../Header';
import RegisterModal from '../RegisterModal';
import LoginModal from '../LoginModal';
import Sidebar from '../Sidebar';
import CreatePost from '../../routes/CreatePost';
import ScrollRestoration from '../ScrollRestoration';
import User from '../../routes/User';

export const App = ({ refreshToken, getSession }) => {
  useEffect(() => {
    const auth = async () => {
      // Get the access token from local storage
      const token = localStorage.getItem('token');
      // If token found,...
      if (token) {
        // ...then decode the token
        const decodedToken = decode(token);
        // If access token is expired...
        if (decodedToken.exp < Date.now() / 1000) {
          // ...fetch new access token
          await refreshToken();
        } else {
          // If access token is valid, set timeout for the period
          setTimeout(async () => {
            // When the token expires, fetch new access token
            await refreshToken();
          }, decodedToken.exp * 1000 - Date.now() - 1000);
        }
        // Fetch session data
        await getSession();
      }
    };
    auth();
  }, [refreshToken, getSession]);

  return (
    <div className={styles.app}>
      <Router>
        <Header />
        <RegisterModal />
        <LoginModal />
        <Sidebar />
        <main className={styles.main}>
          <Switch>
            <Route path={['/', '/r/:community']} exact>
              <Posts />
            </Route>
            <Route path='/post/:post_id'>
              <Discussion />
            </Route>
            <Route path='/submit'>
              <CreatePost />
            </Route>
            <Route path='/u/:userName/:userSection?'>
              <User />
            </Route>
            <Redirect to='/' />
          </Switch>
        </main>
        <Route>
          <ScrollRestoration />
        </Route>
      </Router>
    </div>
  );
};

App.propTypes = {
  refreshToken: PropTypes.func.isRequired,
  getSession: PropTypes.func.isRequired
};
