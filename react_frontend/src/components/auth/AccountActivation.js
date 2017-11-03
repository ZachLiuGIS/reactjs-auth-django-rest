import React, { Component } from "react";
import { reduxForm, propTypes } from "redux-form";
import { activateUserAccount } from "../../actions/authActions";
import { renderError } from "../../utils/renderUtils";

class AccountActivation extends Component {

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
                    <h4 className="text-md-center">Please click the button below to activate your account</h4>
                    <hr/>

                    <fieldset className="form-group">
                        {renderError(error)}
                        <button action="submit" className="btn btn-primary">Activate</button>
                    </fieldset>
                </form>
            </div>
        );
    }
}

export default reduxForm({
    form: "user_account_activation",
    onSubmit: activateUserAccount,
})(AccountActivation);
