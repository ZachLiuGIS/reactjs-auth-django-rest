import React from 'react';
import addons from 'react-addons';
import ReactMixin from 'react-mixin';
import Auth from '../services/AuthService';
import PublicHeader from '../components/PublicHeader';

class Body extends React.Component {

    constructor() {
        super();
    }

    signup(evt) {
        evt.preventDefault();
        var email = this.refs.email.value;
        var username = this.refs.username.value;
        var password1 = this.refs.password1.value;
        var password2 = this.refs.password2.value;

        Auth.signup(email, username, password1, password2)
            .catch(function(err) {
                alert("There's an error signing up");
                console.log("Error logging in", err);
            });
    }

    render() {
        return (
            <div className="container jumbotron">
                <h2>Signup</h2>
                <form role="form">
                    <div className="form-group">
                        <label htmlFor="email">User Email</label>
                        <input type="email" className="form-control" id="email"
                               placeholder="User email" ref="email"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="username">User Name</label>
                        <input type="text" className="form-control" id="username"
                               placeholder="User name" ref="username"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" id="password"
                               placeholder="Password" ref="password1" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password2">Repeat Password</label>
                        <input type="password" className="form-control" id="password2"
                               placeholder="Confirm password" ref="password2" />
                    </div>
                    <button type="submit" className="btn btn-default" onClick={this.signup.bind(this)}>Submit</button>
                </form>
            </div>
        );
    }
}

class Signup extends React.Component {
    render() {
        return (
            <div>
                <PublicHeader/>
                <Body/>
            </div>
        )
    }
}

export default Signup;

ReactMixin(Body.prototype, addons.LinkedStateMixin);