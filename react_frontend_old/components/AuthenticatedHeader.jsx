import React from 'react';
import {Router, Route, Link} from 'react-router';
import Auth from '../services/AuthService'

class AuthenticatedHeader extends React.Component {

    logout(evt) {
        evt.preventDefault();
        Auth.logout()
    }

    render() {
        return (
            <div>
                <nav className="navbar navbar-default navbar-fixed-top">
                    <div className="container">
                        <div className="navbar-header">
                            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                                <span className="sr-only">Toggle navigation</span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                            </button>
                            <Link className="navbar-brand" to="/dashboard">Dashboard</Link>
                        </div>
                        <div id="navbar" className="navbar-collapse collapse">
                            <ul className="nav navbar-nav navbar-right">
                                <li><Link to="/password-change">Change Password</Link></li>
                                <li><Link to="/user-detail">User Detail</Link></li>
                                <li><a href="#" onClick={this.logout.bind(this)}>Logout</a></li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        )
    }
}

export default AuthenticatedHeader;