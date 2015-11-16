import React from 'react';
import UserStore from '../stores/UserStore';
import History from '../services/History';

export default (ComposedComponent) => {

    return class AuthenticatedComponent extends React.Component {

        // This is discarded for React Router >= 1.*
        //static willTransitionTo(transition) {
        //    console.log('will transition');
        //    if (!UserStore.isLoggedIn()) {
        //        History.replaceState(null, '/login');
        //    }
        //}


        constructor() {
            super();
            this.state = this._getLoginState();
        }

        _getLoginState() {
            return {
                userLoggedIn: UserStore.isLoggedIn(),
                token: UserStore.token
            }
        }

        componentDidMount() {
            console.log('auth com mount');
            this.changeListener = this._onChange.bind(this);
            UserStore.addChangeListener(this.changeListener);
        }

        _onChange() {
            this.setState(this._getLoginState());
        }

        componentWillUnmount() {
            UserStore.removeChangeListener(this.changeListener);
        }

        render() {
            return (
                <ComposedComponent {...this.props}
                    token={this.state.token}
                    userLoggedIn={this.state.userLoggedIn}/>
            );
        }
    }
}