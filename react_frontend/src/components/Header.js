import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class Header extends Component {

    static propTypes = {
        authenticated: PropTypes.bool
    };

    renderLinks() {
        if (this.props.authenticated) {
            return (
                [
                    <li className="nav-item" key="profile">
                        <Link className="nav-link" to="/profile">Profile</Link>
                    </li>,
                    <li className="nav-item" key="logout">
                        <Link className="nav-link" to="/logout">Logout</Link>
                    </li>
                ]
            );

        } else {
            return (
                [
                    <li className="nav-item" key="login">
                        <Link className="nav-link" to="/login">Login</Link>
                    </li>,
                    <li className="nav-item" key="signup">
                        <Link className="nav-link" to="/signup">Sign Up</Link>
                    </li>
                ]
            );
        }
    }

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <Link to="/" className="navbar-brand">Auth Demo</Link>
                <ul className="navbar-nav">
                    {this.renderLinks()}
                </ul>
            </nav>
        )
    }
}

function mapStateToProps(state) {
    return {
        authenticated: state.auth.authenticated
    }
}
export default connect(mapStateToProps)(Header);