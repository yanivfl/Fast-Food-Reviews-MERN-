import {LoginActionsConstants} from './constants'
import {call, put, takeEvery} from 'redux-saga/effects'
import LoginActions from './actions'
import SnackActions from "../SnackBar/actions";
import { setInStorage } from '../../utils/storage';

function* isUserExist(action){
    console.log('LoginSaga, isUserExist=', action);
    try {
        const res = yield call(fetch, action.uri,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            });

        const json = yield call([res, 'json']); //retrieve body of response
        yield put(LoginActions.isUserExistSuccess(json.data));
    } catch (e) {
        yield put(SnackActions.openSnackBar(false, e.toString()));
    }
}

function* signUp(action){
    console.log('LoginSaga, signUp=', action);
    //TODO: change
    var formData = new FormData();
    formData.append('avatar', action.payload.details.avatar);
    formData.append('user_name', action.payload.details.user_name);
    formData.append('password', action.payload.details.password);
    formData.append('location', action.payload.details.location.name);
    try {
        const res = yield call(fetch, action.uri,
            {
                method: 'POST',
                body: formData
              });

        const json = yield call([res, 'json']); //retrieve body of response
        if (json.success) {
            setInStorage('fast_food_reviews', {token: json.data.token})
            yield put(LoginActions.signInActionSuccess(json.data));
        }
        else
            yield put(SnackActions.openSnackBar(false, json.message));
    } catch (e) {
        yield put(SnackActions.openSnackBar(false, e.toString()));
    }
}

function* signIn(action){
    console.log('LoginSaga, signIn=', action);
    try {
        const res = yield call(fetch, action.uri,
            {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(action.payload.details)
              });

        const json = yield call([res, 'json']); //retrieve body of response
        if (json.success){
            if(action.payload.details.remember_me){
                setInStorage('fast_food_reviews', {token: json.data.token});
            }            
        yield put(LoginActions.signInActionSuccess(json.data));
        }
        else  {
            yield put(SnackActions.openSnackBar(false, json.message));
        }
    } catch (e) {
        yield put(SnackActions.openSnackBar(false, e.toString()));
    }
}

function* signInFB(action){
    console.log('LoginSaga, signInFB=', action);
    try {
        const res = yield call(fetch, action.uri,
            {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(action.payload.details)
              });

        const json = yield call([res, 'json']); //retrieve body of response
        if (json.success) {
            setInStorage('fast_food_reviews', {token: json.data.token})
            yield put(LoginActions.signInFBActionSuccess(json.data));
        }
        else
            yield put(SnackActions.openSnackBar(false, json.message));
    } catch (e) {
    yield put(SnackActions.openSnackBar(false, e.toString()));
    }
}

function* signOut(action){
    console.log('LoginSaga, signOut=', action);
    try {
        const res = yield call(fetch, action.uri,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
            });

        const json = yield call([res, 'json']); //retrieve body of response
        if (json.success) {
             yield put(LoginActions.signOutSuccessAction(action.token));
        } else {
            yield put(SnackActions.openSnackBar(false, json.message));
            }
    } catch (e) {
    yield put(SnackActions.openSnackBar(false, e.toString()));
    }
}

function* LoginSaga() {
    //using takeEvery, you take the action away from reducer to saga
    yield takeEvery(LoginActionsConstants.IS_USERNAME_EXIST, isUserExist);
    yield takeEvery(LoginActionsConstants.SIGN_UP, signUp);
    yield takeEvery(LoginActionsConstants.SIGN_IN, signIn);
    yield takeEvery(LoginActionsConstants.SIGN_IN_FB, signInFB);
    yield takeEvery(LoginActionsConstants.SIGN_OUT, signOut);

}

export default LoginSaga;

  
