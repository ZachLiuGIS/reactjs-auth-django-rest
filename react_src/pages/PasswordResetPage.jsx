import React from 'react';
import addons from 'react-addons';
import ReactMixin from 'react-mixin';
import Auth from '../services/AuthService';
import AuthenticatedComponent from '../components/AuthenticatedComponent';
import History from '../services/History';

class PasswordChangePage extends React.Component {

    constructor() {
        super();
    }

    reset_password(evt) {
        evt.preventDefault();
        var email = this.refs.email.value;
        console.log(email);
        Auth.reset_password(email)
            .catch(function(err) {
                console.log("Error changing password", err)
            })
            .done(function(data) {
                console.log(data);
                History.replaceState(null, '/');
            });
    }

    render() {
        return (
            <div className="login jumbotron center-block">
                <h1>Reset Password</h1>
                <form role="form">
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" className="form-control" id="email" ref="email"
                               placeholder="Email address related to your account"/>
                    </div>
                    <button type="submit" className="btn btn-default" onClick={this.reset_password.bind(this)}>Submit</button>
                </form>
            </div>
        )
    }
}

export default AuthenticatedComponent(PasswordChangePage);