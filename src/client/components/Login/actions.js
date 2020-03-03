import {LoginActionsConstants} from './constants.js';

function isUserExist(name) {
    return {
        type: LoginActionsConstants.IS_USERNAME_EXIST,
        uri: `api/account/is_user_name_exist?name=${name}`
    }
}

function isUserExistSuccess(user_names){
    return {
        type: LoginActionsConstants.IS_USER_EXIST_SUCCESS,
        payload: {
            user_names: user_names
        }
    }
}

function signUpAction(details) {
    return {
        type: LoginActionsConstants.SIGN_UP,
        uri: 'api/account/signup',
        payload: {
            details
        }
    }
}


function signInAction(details) {
    return {
        type: LoginActionsConstants.SIGN_IN,
        uri: 'api/account/signin',
        payload: {
            details
        }
    }
}

function signInActionSuccess(details){
    return {
        type: LoginActionsConstants.SIGN_IN_SUCCESS,
        payload: {
            details
        }
    }
}

function signInFBAction(details) {
    return {
        type: LoginActionsConstants.SIGN_IN_FB,
        uri: '/api/account/signin_ext_acc',
        payload: {
            details
        }
    }
}

function signInFBActionSuccess(details){
    return {
        type: LoginActionsConstants.SIGN_IN_FB_SUCCESS,
        payload: {
            details
        }
    }
}

function setLatLngAction(lat,lng){
    return {
        type: LoginActionsConstants.SET_LAN_LNG,
        payload: {
            lat: lat,
            lng: lng
        }
    }
}

function signOutAction(token){
    return {
        type: LoginActionsConstants.SIGN_OUT,
        uri: 'api/account/logout?token=' + token,
        token: token
    }
}

function signOutSuccessAction(){
    return {
        type: LoginActionsConstants.SIGN_OUT_SUCCESS,
    }
}

let LoginActions  = {
    isUserExist,
    isUserExistSuccess,
    signUpAction,
    signInAction,
    signInActionSuccess,
    signInFBAction,
    signInFBActionSuccess,
    setLatLngAction,
    signOutAction,
    signOutSuccessAction
};

export default LoginActions
