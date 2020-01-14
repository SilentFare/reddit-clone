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

export const App = ({ refreshToken }) => {
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      refreshToken();
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
