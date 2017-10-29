import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { reduxForm, Field, propTypes } from "redux-form";
import { changePassword } from "../../actions/authActions";

class Signup extends Component {

    static propTypes = {
        ...propTypes,
        changePassword: PropTypes.func
    };

    handleFormSubmit = (values) => {
        // Call action creator to sign up the user.
        this.props.changePassword(values);
    };

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
                    onSubmit={handleSubmit(this.handleFormSubmit)}
                >
                    <h4 className="text-md-center">Change Password</h4>
                    <hr/>

                    <fieldset className="form-group">
                        <Field name="old_password" label="Old Password" component={this.renderField}
                               type="password"/>
                    </fieldset>

                    <fieldset className="form-group">
                        <Field name="new_password1" label="New Password" component={this.renderField}
                               type="password"/>
                    </fieldset>

                    <fieldset className="form-group">
                        <Field name="new_password2" label="Confirm New Password" component={this.renderField}
                               type="password"/>
                    </fieldset>

                    <fieldset className="form-group">
                        {this.renderAlert()}
                        <button action="submit" className="btn btn-primary">Submit</button>
                    </fieldset>
                </form>
            </div>
        );
    }
}

// Sync field level validation for password match
const validateForm = values => {
    const errors = {};
    const { new_password1, new_password2 } = values;
    if (new_password1 !== new_password2) {
        errors.passwordConfirm = "Password does not match."
    }
    return errors;
};

function mapStateToProps(state) {
    return { errorMessage: state.auth.error };
}

export default connect(mapStateToProps, { changePassword })(reduxForm({
    form: "change_password",
    validate: validateForm
})(Signup));
