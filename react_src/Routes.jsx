import React from 'react';
import {Router, Route, IndexRoute} from 'react-router';
import History from './services/History';
import UserStore from './stores/UserStore';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import SignupPage from './pages/SignupPage';
import PasswordResetPage from './pages/PasswordResetPage';
import PasswordChangePage from './pages/PasswordChangePage';
import UserDetailPage from './pages/UserDetailPage';

var requireAuth = function(nextState, replaceState, callback) {
    // call this callback function before transition to make the transition work.
    callback();
    console.log('Login required');
    console.log(UserStore.isLoggedIn());
    if (!UserStore.isLoggedIn()) {
        console.log(replaceState);
        History.replaceState({ nextPathname: nextState.location.pathname }, '/login');
    }
};

export default (
    <Router history={History}>
        <Route path='/' component={HomePage} />
        <Route path='/login' component={LoginPage} />
        <Route path="/signup" component={SignupPage}/>
        <Route path="/password-reset" component={PasswordResetPage}/>
        <Route path="/password-change" component={PasswordChangePage} onEnter={requireAuth}/>
        <Route path='/user-detail' component={UserDetailPage} onEnter={requireAuth}/>
        <Route path='/dashboard' component={DashboardPage} onEnter={requireAuth}/>
    </Router>
);