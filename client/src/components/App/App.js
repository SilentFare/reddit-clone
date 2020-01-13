import React from 'react';
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

export const App = () => {
  return (
    <div className={styles.app}>
      <Router>
        <Header />
        <RegisterModal show={true} />
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