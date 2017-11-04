import React, { Component } from "react";
// import PropTypes from "prop-types";
import { reduxForm, Field, propTypes } from "redux-form";
import { Link } from "react-router-dom";
import { required } from "redux-form-validators"

import { renderField, renderError} from "../../utils/renderUtils";
import { updateUserProfile } from "../../actions/authActions";

class Login extends Component {

    static propTypes = {
        ...propTypes
    };

    render() {
        const { handleSubmit, error } = this.props;

        return (
            <div className="row justify-content-center">

                <form
                    className="col col-sm-4 card mt-5 p-2"
                    onSubmit={handleSubmit}
                >
                    <h4 className="text-md-center">Please Log In</h4>
                    <hr/>

                    <fieldset className="form-group">
                        <Field name="username" label="Username" component={renderField}
                               type="text"
                        />
                    </fieldset>

                    <fieldset className="form-group">
                        <Field name="firstname" label="First Name" component={renderField}
                               type="text"
                        />
                    </fieldset>

                    <fieldset className="form-group">
                        <Field name="lastname" label="Last Name" component={renderField}
                               type="text"
                        />
                    </fieldset>

                    <fieldset className="form-group">
                        { renderError(error) }
                        <button action="submit" className="btn btn-primary">Save</button>
                    </fieldset>
                </form>
            </div>
        )
    }
}

export default reduxForm({
    form: "update_user_profile",
    onSubmit: updateUserProfile
})(Login);
