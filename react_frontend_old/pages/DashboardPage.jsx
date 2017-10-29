import React from 'react';
import AuthenticatedComponent from '../components/AuthenticatedComponent';
import Auth from '../services/AuthService'
import {Link} from 'react-router';
import AuthenticatedPublicHeader from '../components/AuthenticatedHeader';

class Body extends React.Component {

    logout() {
        Auth.logout()
    }

    render() {
        return (
            <div className="container jumbotron">
                <h2>Welcome to the Dashboard Page</h2>
                <p>You have logged in successfully!</p>
            </div>
        )
    }
}

class DashboardPage extends React.Component {
    render() {
        return (
            <div>
                <AuthenticatedPublicHeader/>
                <Body/>
            </div>
        )
    }
}

export default AuthenticatedComponent(DashboardPage);