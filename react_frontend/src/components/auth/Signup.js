import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { reduxForm, Field, propTypes } from "redux-form";
import { signupUser } from "../../actions/authActions";

class Signup extends Component {

    static propTypes = {
        ...propTypes,
        signupUser: PropTypes.func,
        errorMessage: PropTypes.string
    };

    handleFormSubmit(values) {
        // Call action creator to sign up the user.
        this.props.signupUser(values);
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

    renderAlert() {
        if (this.props.errorMessage) {
            return (
                <div className="alert alert-danger">
                    <string>Oops!</string> {this.props.errorMessage}
                </div>
            )
        }
    }

    render() {
        const { handleSubmit } = this.props;

        return (
            <div className="row justify-content-center">
                <form
                    className="col col-sm-4 card mt-5 p-2"
                    onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}
                >
                    <fieldset className="form-group">
                        <Field name="username" label="username" component={this.renderField}
                               type="text"/>
                    </fieldset>

                    <fieldset className="form-group">
                        <Field name="email" label="email" component={this.renderField}
                               type="text"/>
                    </fieldset>

                    <fieldset className="form-group">
                        <Field name="password1" label="Password" component={this.renderField}
                               type="password"/>
                    </fieldset>

                    <fieldset className="form-group">
                        <Field name="password2" label="Confirm Password" component={this.renderField}
                               type="password"/>
                    </fieldset>

                    <fieldset className="form-group">
                        {this.renderAlert()}
                        <button action="submit" className="btn btn-primary">Sign Up</button>
                    </fieldset>
                </form>
            </div>
        );
    }
}

// Sync field level validation for password match
const validateForm = values => {
    const errors = {};
    const { password1, password2 } = values;
    if (password1 !== password2) {
        errors.passwordConfirm = "Password does not match."
    }
    return errors;
};

function mapStateToProps(state) {
    return { errorMessage: state.auth.error };
}

export default connect(mapStateToProps, { signupUser })(reduxForm({
    form: "signup",
    validate: validateForm
})(Signup));
