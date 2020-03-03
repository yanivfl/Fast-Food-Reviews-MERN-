import {SnackBarConstants} from './constants';

function openSnackBar(snack_isSucc, snack_message) {
    return {
        type: SnackBarConstants.SNACK_OPEN,
        snack_isSucc: snack_isSucc,
        snack_message: snack_message,

    }
}

function closeSnackBar() {
    return {
        type: SnackBarConstants.SNACK_CLOSE,
    }
}


let SnackActions = {
    openSnackBar,
    closeSnackBar,
};

export default SnackActions
