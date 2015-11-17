import React from 'react';
import addons from 'react-addons';
import ReactMixin from 'react-mixin';
import Auth from '../services/AuthService';
import PublicHeader from '../components/PublicHeader';

class Body extends React.Component {

    constructor() {
        super();

    }

    login(evt) {
        evt.preventDefault();

        var email = this.refs.email.value;
        var password = this.refs.password.value;

        Auth.login(email, password)
            .catch(function(err) {
                console.log("Error logging in", err)
            });
    }

    handleChange(evt, name) {
        this.state[name] = evt.target.value;
    }

    render() {
        return (
            <div className="container jumbotron">
                <h2>Login</h2>
                <form role="form">
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="text" className="form-control" id="email"
                               placeholder="Email Address" ref="email"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" id="password" placeholder="Password"
                                ref="password"/>
                    </div>
                    <button type="submit" className="btn btn-default" onClick={this.login.bind(this)}>Submit</button>
                </form>
            </div>
        )
    }
}

class Login extends React.Component {
    render() {
        return(
            <div>
                <PublicHeader/>
                <Body/>
            </div>
        )
    }
}

export default Login;