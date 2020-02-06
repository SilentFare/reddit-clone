import React, { useEffect } from 'react';
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

export const App = ({ refreshToken, getSession }) => {
  useEffect(() => {
    const auth = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        await refreshToken();
      } else {
        const decodedToken = decode(token);
        if (decodedToken.exp < Date.now() / 1000) {
          await refreshToken();
        }
      }
      await getSession();
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
            <Route path='/discussion'>
              <Discussion />
            </Route>
            <Route path='/submit'>
              <CreatePost />
            </Route>
            <Redirect to='/' />
          </Switch>
        </main>
      </Router>
    </div>
  );
};
