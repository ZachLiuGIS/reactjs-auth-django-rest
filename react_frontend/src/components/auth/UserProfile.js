import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
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
        console.log(user);
        if (user) {
            return (
                <div className="mx-2">
                    <h4>username: {user.username}</h4>
                    <h4>email: {user.email}</h4>
                    <h4>Website: {user.website}</h4>
                    <hr />
                    <h4>About Myself:</h4>
                    <p>{user.about}</p>
                </div>
            );
        }
        return null;
    }

    render() {
        return (
            <div>
                {this.renderUser()}
                {" "}
                <Link to="/change_password">change password</Link>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.auth.user
    }
}

export default connect(mapStateToProps, { getUserProfile } )(UserProfile);