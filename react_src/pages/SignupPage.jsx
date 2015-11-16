import React from 'react';
import addons from 'react-addons';
import ReactMixin from 'react-mixin';
import Auth from '../services/AuthService';

class Signup extends React.Component {

    constructor() {
        super();
        this.state = {
            useremail:'',
            username: '',
            password1: '',
            password2: ''
        };
    }

    signup(e) {
        e.preventDefault();
        Auth.signup(this.state.useremail, this.state.username, this.state.password1, this.state.password2)
            .catch(function(err) {
                alert("There's an error signing up");
                console.log("Error logging in", err);
            });
    }

    render() {
        return (
            <div className="login jumbotron center-block">
                <h1>Signup</h1>
                <form role="form">
                    <div className="form-group">
                        <label htmlFor="useremail">User Email</label>
                        <input type="email" valueLink={this.linkState('useremail')} className="form-control" id="useremail" placeholder="User email" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="username">User Name</label>
                        <input type="text" valueLink={this.linkState('username')} className="form-control" id="username" placeholder="User name" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" valueLink={this.linkState('password1')} className="form-control" id="password" ref="password" placeholder="Password" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password_repeat">Repeat Password</label>
                        <input type="password" valueLink={this.linkState('password2')} className="form-control" id="password_repeat" ref="confirm_password" placeholder="Confirm password" />
                    </div>
                    <button type="submit" className="btn btn-default" onClick={this.signup.bind(this)}>Submit</button>
                </form>
            </div>
        );
    }
}

export default Signup;

ReactMixin(Signup.prototype, addons.LinkedStateMixin);