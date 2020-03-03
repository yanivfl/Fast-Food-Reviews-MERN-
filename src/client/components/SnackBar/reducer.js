import initialState from '../../initialState';
import {SnackBarConstants} from './constants.js';


const SnackBarReducer = (state = initialState.snackBar, action) => {
    console.log('SnackBarReducerState=', state);
    console.log('RECEIVED ACTION: ' + action.type , action);

    switch (action.type) {
        case SnackBarConstants.SNACK_OPEN:
            return state
                .set('snack_message', action.snack_message)
                .set('snack_isSucc', action.snack_isSucc)
                .set('display_snack', true);

        case SnackBarConstants.SNACK_CLOSE:
            return state
                .set('display_snack', false);

        case  '@@redux-form/SET_SUBMIT_FAILED':
            if(action.error){
                return state
                .set('snack_message', 'some fields are missing')
                .set('snack_isSucc', false)
                .set('display_snack', true);
            }
            else return state;



        default: //otherwise state is lost!
            return state;
    }
};

export default SnackBarReducer
