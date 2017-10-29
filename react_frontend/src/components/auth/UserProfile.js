import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getUserProfile } from "../../actions/authActions";

class UserProfile extends Component {

    static propTypes = {
        getUserProfile: PropTypes.func.isRequired,
        user: PropTypes.object
    };

    componentWillMount() {
        this.props.getUserProfile();
    }

    renderUser() {
        const user = this.props.user;
        if (user) {
            return (
                <div className="mx-2">
                    <h4>username: {user.username}</h4>
                    <h4>email: {user.email}</h4>
                </div>
            );
        }
        return null;
    }

    render() {
        return this.renderUser();
    }
}

function mapStateToProps(state) {
    return {
        user: state.auth.user
    }
}

export default connect(mapStateToProps, { getUserProfile } )(UserProfile);