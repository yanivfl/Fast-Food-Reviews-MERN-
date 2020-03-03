import React, {Component} from 'react';
import Register from './Register';
import SignIn from './SignIn';
import LoginActions from './actions';
import AppActions from "../App/actions";
import {connect} from 'react-redux';
import './Login.scss';
import {fileChangedHandler} from '../../utils/ImageHandler'


class LoginPage extends Component {

    onSignIn = values => this.props.signInEventHandler(values);

    onRegister = values => this.props.signUpEventHandler(values);

    showSignInBox = () => {
        this.props.updateIsSignInEventHandler(true);
        this.props.updateIsRegisterEventHandler(false);
    };

    showRegisterBox = () => {
        this.props.updateIsSignInEventHandler(false);
        this.props.updateIsRegisterEventHandler(true);
    };

    render() {

        const {isSignInOpen, isRegisterOpen} = this.props;

        return (
            <div>
                <div className="box-controller">
                    <div className={"controller " +
                    (isSignInOpen ? "selected-controller" : "")}
                         onClick={this.showSignInBox}>
                        Login
                    </div>
                    <div className={"controller " +
                    (isRegisterOpen ? "selected-controller" : "")}
                         onClick={this.showRegisterBox}>
                        Register
                    </div>
                </div>
                <div className="box-container">
                    {isSignInOpen && <SignIn onSubmit={this.onSignIn}/>}
                    {isRegisterOpen && <Register onSubmit={this.onRegister}/>}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isSignInOpen: state['app'].get('isSignInOpen'),
        isRegisterOpen: state['app'].get('isRegisterOpen'),
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        updateIsSignInEventHandler: (isSignInOpen) => {
            dispatch(AppActions.updateIsSignInOpenAction(isSignInOpen));
        },
        updateIsRegisterEventHandler: (isRegisterOpen) => {
            dispatch(AppActions.updateIsRegisterOpenAction(isRegisterOpen));
        },
        signUpEventHandler: (values) => {
            if (!values['avatar']) { //if no picture was added
                dispatch(LoginActions.signUpAction(values))
            } else {
                fileChangedHandler(values['avatar'], cropped_avatar => {
                    values['avatar'] = cropped_avatar;
                    console.log(values['avatar']);
                    dispatch(LoginActions.signUpAction(values))
                });
            }
        },
        signInEventHandler: (values, callback) => {
            dispatch(LoginActions.signInAction(values, callback));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);