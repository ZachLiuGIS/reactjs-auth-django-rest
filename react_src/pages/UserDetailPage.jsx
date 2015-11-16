import React from 'react';
import AuthenticatedComponent from '../components/AuthenticatedComponent';
import Auth from '../services/AuthService'
import {Link} from 'react-router';
import UserActions from '../actions/UserActions';
import UserStore from '../stores/UserStore';

class UserDetailPage extends React.Component {

    constructor() {
        super();
        this.state = {
            user: {
                email: '',
                username: '',
                firstname: '',
                lastname: ''
            }
        };

        // need .bind(this), otherwise this will be UserStore
        UserStore.addChangeListener(this._onChange.bind(this));
        this.loadUserDetail();
    }

    loadUserDetail() {
        Auth.getUserData(UserStore.token);
    }

    logout() {
        Auth.logout()
    }

    _onChange() {
        if (UserStore.user !== undefined) {
            this.state.user = UserStore.user;
        }
    }

    render() {
        return (
            <div>
                <h1>User Detail</h1>
                <table className="table-striped">
                    <tbody>
                        <tr>
                            <td>Email: </td>
                            <td>{this.state.user.email}</td>
                        </tr>
                        <tr>
                            <td>Username: </td>
                            <td>{this.state.user.username}</td>
                        </tr>
                        <tr>
                            <td>Firstname: </td>
                            <td>{this.state.user.firstname}</td>
                        </tr>
                        <tr>
                            <td>Lastname: </td>
                            <td>{this.state.user.lastname}</td>
                        </tr>
                    </tbody>
                </table>
                <Link to="/dashboard">Go to Dashboard</Link><br/>
                <button className="btn btn-primary" onClick={this.logout.bind(this)}>Logout</button>
            </div>
        )
    }
}

export default AuthenticatedComponent(UserDetailPage);