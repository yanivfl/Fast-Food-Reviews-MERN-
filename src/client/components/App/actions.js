import { AppActionsConstants} from './constants.js';

function updateIsSignInOpenAction(isSignInOpen) {
    return {
        type: AppActionsConstants.UPDATE_IS_SIGN_IN_OPEN,
        payload: {
        isSignInOpen
        }
    }
}

function updateIsRegisterOpenAction(isRegisterOpen) {
    return {
        type: AppActionsConstants.UPDATE_IS_REGISTER_OPEN,
        payload: {
            isRegisterOpen
        }
    }
  } 
  
function verifyTokenAction(token) {
    return {
        type: AppActionsConstants.VERIFY_TOKEN,
        uri: 'api/account/verify?token=' + token,
        token: token
    }
}

function verifyTokenFailureAction(error) {
    return {
        type: AppActionsConstants.VERIFY_TOKEN_FAILURE,
        error: error
    }
}

function OpenLoadingScreen() {
    return {
        type: AppActionsConstants.OPEN_LOADING,
    }
}

function closeLoadingScreen() {
    return {
        type: AppActionsConstants.CLOSE_LOADING,
    }
}

let AppActions  = {
    updateIsSignInOpenAction,
    updateIsRegisterOpenAction,
    verifyTokenAction,
    verifyTokenFailureAction,
    OpenLoadingScreen,
    closeLoadingScreen,
};

export default AppActions
