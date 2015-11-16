import React from 'react';
import AuthenticatedComponent from '../components/AuthenticatedComponent';
import Auth from '../services/AuthService'
import {Link} from 'react-router';

class DashboardPage extends React.Component {

    logout() {
        Auth.logout()
    }

    render() {
        return (
            <div>
                <h1>This is the Dashboard Page</h1>
                <Link to="/user-detail">User Detail</Link><br/>
                <Link to="/password-change">Change Password</Link><br/>
                <button className="btn btn-primary" onClick={this.logout.bind(this)}>Logout</button>
            </div>
        )
    }
}

export default AuthenticatedComponent(DashboardPage);