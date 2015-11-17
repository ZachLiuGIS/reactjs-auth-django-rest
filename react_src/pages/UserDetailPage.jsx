import React from 'react';
import AuthenticatedComponent from '../components/AuthenticatedComponent';
import Auth from '../services/AuthService'
import {Link} from 'react-router';
import UserActions from '../actions/UserActions';
import UserStore from '../stores/UserStore';
import AuthenticatedHeader from '../components/AuthenticatedHeader';

class Body extends React.Component {

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

        this.tableStyles = {
            fontSize: "14px"
        }
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
            <div className="container jumbotron">
                <h2>User Detail</h2>
                <table className="table" style={this.tableStyles}>
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
            </div>
        )
    }
}

class UserDetailPage extends React.Component {
    render() {
        return (
            <div>
                <AuthenticatedHeader/>
                <Body/>
            </div>
        )
    }
}

export default AuthenticatedComponent(UserDetailPage);