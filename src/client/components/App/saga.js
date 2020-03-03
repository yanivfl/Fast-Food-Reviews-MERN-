import {AppActionsConstants} from './constants';
import { call, put, takeEvery } from 'redux-saga/effects';
import AppActions from './actions';
import LoginActions from '../Login/actions';

function* verifyToken(action){
    console.log('AppSaga, verifyToken=', action);
    try {
        const res = yield call(fetch, action.uri,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            });

        const json = yield call([res, 'json']); //retrieve body of response
        if (json.success) {
            yield put(LoginActions.signInActionSuccess(json.data));
        } else {
            yield put(AppActions.verifyTokenFailureAction(json.message)); 
        }
    } catch (e) {
    yield put(AppActions.verifyTokenFailureAction('catch: ' + e.message)); 
    }
}

function* AppSaga() {
    //using takeEvery, you take the action away from reducer to saga
    yield takeEvery(AppActionsConstants.VERIFY_TOKEN, verifyToken);

}

export default AppSaga;
