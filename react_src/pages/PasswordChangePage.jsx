import React from 'react';
import addons from 'react-addons';
import ReactMixin from 'react-mixin';
import Auth from '../services/AuthService';
import AuthenticatedComponent from '../components/AuthenticatedComponent';
import History from '../services/History';

class PasswordChangePage extends React.Component {

    constructor() {
        super();
        this.state = {
            new_password1: '',
            new_password2: ''
        }
    }

    change_password(evt) {
        evt.preventDefault();
        Auth.change_password(this.state.new_password1, this.state.new_password2)
            .catch(function(err) {
                console.log("Error changing password", err)
            })
            .done(function(data) {
                console.log(data);
                History.replaceState(null, '/dashboard');
            });
    }

    handleChange(evt, name) {
        this.state[name] = evt.target.value;
    }

    render() {
        return (
            <div className="login jumbotron center-block">
                <h1>Change Password</h1>
                <form role="form">
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" id="password" ref="password"
                               placeholder="New password" onChange={(evt) => this.handleChange(evt, "new_password1")} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password_repeat">Repeat Password</label>
                        <input type="password" className="form-control" id="password_repeat" ref="confirm_password"
                               placeholder="Confirm new password" onChange={(evt) => this.handleChange(evt, "new_password2")}/>
                    </div>
                    <button type="submit" className="btn btn-default" onClick={this.change_password.bind(this)}>Submit</button>
                </form>
            </div>
        )
    }
}

export default AuthenticatedComponent(PasswordChangePage);