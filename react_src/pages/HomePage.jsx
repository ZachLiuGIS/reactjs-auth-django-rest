import React from 'react';
import {Router, Route, Link} from 'react-router';

class HomePage extends React.Component {
    render() {
        return (
            <div>
                <h1> This is the Home Page </h1>
                <Link to="/login">Login</Link><br/>
                <Link to="/Signup">Signup</Link><br/>
                <Link to="/dashboard">Dashboard</Link><br/>
                <Link to="/password-change">Change Password</Link><br/>
                <Link to="/password-reset">Forget Password?</Link>
            </div>
        )
    }
}

export default HomePage;