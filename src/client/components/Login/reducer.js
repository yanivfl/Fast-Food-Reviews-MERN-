import initialState from '../../initialState'
import {LoginActionsConstants} from './constants.js'
import {AppActionsConstants} from '../App/constants.js'
import { arrayBufferToUrl } from '../../utils/ImageHandler'
import { MainActionsConstants } from '../MainPage/constants'
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete'


const LoginReducer = (state = initialState.login, action) => {
    console.log('LoginReducerState=', state);
    console.log('RECEIVED ACTION: ' + action.type, action);

    switch (action.type) {
        case LoginActionsConstants.IS_USER_EXIST_SUCCESS:
            return state.set('user_names', action.payload.user_names);

        case LoginActionsConstants.SIGN_IN_SUCCESS:    
            var avatar = action.payload.details.user_data.avatar;
            var is_external_acc = action.payload.details.user_data.is_external_acc;
            if (is_external_acc)
                avatar = action.payload.details.user_data.avatar_url;
            else if (avatar && avatar.data)
                avatar = arrayBufferToUrl(avatar.data.data);

            return state
                .set('token', action.payload.details.token)
                .set('user_name', action.payload.details.user_data.user_name)
                .set('avatar', avatar)
                .set('avatar_preview', avatar)
                .set('location', action.payload.details.user_data.location)
                .set('isLoading', false);

        case LoginActionsConstants.SIGN_IN_FB_SUCCESS:
            return state
                .set('token', action.payload.details.token)
                .set('user_name', action.payload.details.user_data.user_name)
                .set('avatar', action.payload.details.user_data.avatar_url)
                .set('avatar_preview', action.payload.details.user_data.avatar_url)
                .set('location', action.payload.details.user_data.location)
                .set('isLoading', false);

        case LoginActionsConstants.SET_LAN_LNG:
            return state
                .set('lat', action.payload.lat)
                .set('lng', action.payload.lng);

        

        case AppActionsConstants.VERIFY_TOKEN_SUCCESS:
            return state
                .set('token', action.token)
                .set('isLoading', false);

        case AppActionsConstants.VERIFY_TOKEN_FAILURE:
            return state.set('isLoading', false);

        case LoginActionsConstants.SIGN_OUT_SUCCESS:
            return state
                .set('token', '')
                .set('avatar', '');

        case MainActionsConstants.CLEAR_AVATAR_PREVIEW:
            return state.set('avatar_preview', '');          

        case '@@redux-form/CHANGE':
            switch (action.meta.field) {
                case 'user_name':
                    return state.set('user_name', action.payload);
                case 'avatar':
                    return state
                    .set('avatar', URL.createObjectURL(action.payload))
                    .set('avatar_preview', URL.createObjectURL(action.payload)); //TODO: change to see only preview
                case 'remember_me':
                    return state.set('remember_me', action.payload);
                case 'location':
                    return state.set('location', action.payload.name);
                case 'avatar_preview':    
                   return state.set('avatar_preview', URL.createObjectURL(action.payload)); 
            }

        default: //otherwise state is lost!
            return state;
    }
};

export default LoginReducer
