'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './Routes';
import UserActions from './actions/UserActions';

// keep the user authenticated
var user_token = localStorage.getItem('user_token');
if (user_token) {
    UserActions.loginUser(user_token);
}


ReactDOM.render(Routes, document.getElementById('app'));