import React, { Component } from "react";
import PropTypes from "prop-types";
import { reduxForm, Field, propTypes } from "redux-form";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { loginUser } from "../../actions/authActions";

class Login extends Component {

    static propTypes = {
        ...propTypes,
        LoginUser: PropTypes.func,
        errorMessage: PropTypes.string
    };

    handleFormSubmit = ({ username, password }) => {
        this.props.loginUser(username, password);
    };

    renderAlert() {
        if (this.props.errorMessage) {
            return (
                <div className="alert alert-danger">
                    <string>Oops!</string> {this.props.errorMessage}
                </div>
            )
        }
    }

    renderField = ({ input, label, type, meta: { touched, error } }) => (
        <div>
            <label>{label}</label>
            <div>
                <input className="form-control" {...input} type={type}/>
            </div>
            {touched && ((error && <div className="alert alert-danger p-1"><small>{error}</small></div>))}
        </div>
    );

    render() {
        const {handleSubmit} = this.props;
        return (
            <div className="row justify-content-center">

                <form
                    className="col col-sm-4 card mt-5 p-2"
                    onSubmit={handleSubmit(this.handleFormSubmit)}
                >
                    <h4 className="text-md-center">Please Log In</h4>
                    <hr/>

                    <fieldset className="form-group">
                        <Field name="username" label="username" component={this.renderField}
                               type="text" />
                    </fieldset>


                    <fieldset className="form-group">
                        <Field name="password" label="Password" component={this.renderField}
                               type="password" />
                    </fieldset>

                    <fieldset className="form-group">
                        {this.renderAlert()}
                        <button action="submit" className="btn btn-primary">Login</button>
                    </fieldset>
                    <p>Not registered? <Link to="/signup">Signup Here!</Link></p>
                </form>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return { errorMessage: state.auth.error };
}

export default connect(mapStateToProps, { loginUser })(reduxForm({
    form: "login"
})(Login));
