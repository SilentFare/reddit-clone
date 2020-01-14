import React, { useEffect } from 'react';
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

export const App = ({ refreshToken, getSession }) => {
  useEffect(() => {
    const momo = async () => {
      await refreshToken();
      await getSession();
    };
    const token = localStorage.getItem('token');
    if (!token) {
      momo();
    } else {
      getSession();
    }
  }, []);

  return (
    <div className={styles.app}>
      <Router>
        <Header />
        <RegisterModal />
        <LoginModal />
        <Sidebar />
        <main className={styles.main}>
          <Switch>
            <Route path='/' exact>
              <Posts />
            </Route>
            <Route path='/discussion'>
              <Discussion />
            </Route>
            <Redirect to='/' />
          </Switch>
        </main>
      </Router>
    </div>
  );
};
