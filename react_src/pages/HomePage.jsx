import React from 'react';
import {Router, Route, Link} from 'react-router';
import PublicHeader from '../components/PublicHeader';

class Body extends React.Component {
    constructor() {
        super();
        this.containerStyles = {
            "marginTop": "40px"
        }
    }

    render() {
        return(
            <div className="container-fluid jumbotron text-center" style={this.containerStyles}>
                <h1>React Auth</h1>
                <p>This is a demo site for ReactJS Authentication with django-rest-auth.</p>
                <Link to='/signup' className="btn btn-lg btn-success">Sign Up</Link> <strong>or</strong> &nbsp;
                <Link to='/login' className="btn btn-lg btn-success">Login</Link>
            </div>
            )
    }
}

class HomePage extends React.Component {
    render() {
        return (
            <div>
                <PublicHeader/>
                <Body/>
            </div>
        )
    }
}

export default HomePage;