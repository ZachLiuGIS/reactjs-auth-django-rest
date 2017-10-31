import React, { Component } from "react";
// import PropTypes from "prop-types";
import { reduxForm, Field, propTypes } from "redux-form";
import { Link } from "react-router-dom";

import { renderField, renderError} from "../../utils/renderUtils";
import { loginUser } from "../../actions/authActions";

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
                        <Field name="username" label="username" component={renderField}
                               type="text" />
                    </fieldset>


                    <fieldset className="form-group">
                        <Field name="password" label="Password" component={renderField}
                               type="password" />
                    </fieldset>

                    <fieldset className="form-group">
                        { renderError(error) }
                        <button action="submit" className="btn btn-primary">Login</button>
                    </fieldset>

                    <p>Not registered? <Link to="/signup">Signup Here!</Link></p>
                </form>
            </div>
        )
    }
}

export default reduxForm({
    form: "login",
    onSubmit: loginUser
})(Login);
