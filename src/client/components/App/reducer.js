import initialState from '../../initialState'
import {AppActionsConstants} from './constants.js';

const AppReducer = (state = initialState.app, action) => {
    console.log('AppReducerState=', state);
    console.log('RECEIVED ACTION: ' + action.type , action);

    switch (action.type){
        case AppActionsConstants.UPDATE_IS_SIGN_IN_OPEN:
            return state.set('isSignInOpen', action.payload.isSignInOpen);

        case AppActionsConstants.UPDATE_IS_REGISTER_OPEN:
            return state.set('isRegisterOpen', action.payload.isRegisterOpen);

        case AppActionsConstants.CLOSE_LOADING:
            return state.set('isLoading', false);

        case AppActionsConstants.OPEN_LOADING:
            return state.set('isLoading', true); 

        default: //otherwise state is lost!
            return state;
    }
};

export default AppReducer
