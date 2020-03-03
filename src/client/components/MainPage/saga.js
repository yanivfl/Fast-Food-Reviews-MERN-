import {MainActionsConstants} from './constants'
import {call, put, takeEvery} from 'redux-saga/effects'
import MainActions from './actions'
import SnackActions from "../SnackBar/actions";
import LoginActions from "../Login/actions";
import AppActions from '../App/actions';

function* loadUserProfiles(action) {
    console.log('MainSaga, loadUserProfiles=', action);
    try {
        const res = yield call(fetch, action.uri,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

        const json = yield call([res, 'json']); //retrieve body of response
        yield put(MainActions.loadUserProfilesSuccess(json.data));
        yield put(AppActions.closeLoadingScreen());
    } catch (e) {
        yield put(SnackActions.openSnackBar(false, e.toString()));
    }
}

function* loadUserReviews(action) {
    console.log('MainSaga, loadUserReviews=', action);
    try {
        const res = yield call(fetch, action.uri,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

        const json = yield call([res, 'json']); //retrieve body of response
        yield put(MainActions.loadUserReviewsSuccess(json.data));
        yield put(AppActions.closeLoadingScreen());
    } catch (e) {
        yield put(SnackActions.openSnackBar(false, e.toString()));
    }
}

function* loadRestaurantReviews(action) {
    console.log('MainSaga, loadRestaurantReviews=', action);
    try {
        const res = yield call(fetch, action.uri,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

        const json = yield call([res, 'json']); //retrieve body of response
        console.log('this is test saga resauarnt review')
        console.log(json)
        yield put(MainActions.loadRestaurantReviewsSuccess(json.data));
        yield put(AppActions.closeLoadingScreen());
    } catch (e) {
        yield put(SnackActions.openSnackBar(false, e.toString()));
    }
}

function* editUserProfile(action) {
    console.log('MainSaga, editUserProfile=', action);
    var formData = new FormData();
    formData.append('user_name', action.payload.data.user_name);
    if(action.payload.data.new_user_name)
        formData.append('new_user_name', action.payload.data.new_user_name);
    if(action.payload.data.new_avatar)
        formData.append('new_avatar', action.payload.data.new_avatar);
    if(action.payload.data.new_location)
        formData.append('new_location', action.payload.data.new_location);

    console.log('this is editUserProfile formData test ')
    console.log(formData)
    try {
        const res = yield call(fetch, action.uri,
            {
                method: 'POST',
                body: formData
            });

        const json = yield call([res, 'json']); //retrieve body of response
        console.log('this is saga responde editUserProfile')
        console.log(json)
        yield put(LoginActions.signInActionSuccess(json.data));
        yield put(SnackActions.openSnackBar(true, 'Profile edited successfully'));
    } catch (e) {
        yield put(SnackActions.openSnackBar(false, e.toString()));
    }
}

function* submitReview(action) {
    console.log('MainSaga, submitReview=', action);
    var formData = new FormData();
    for (let [key, value] of Object.entries(action.payload.form_values)) {
        console.log(`${key}: ${value}`);
        if (key === 'files') {
            console.log('here');
            value.map(file => formData.append('files', file));
        } else {
            formData.append(key, value);
        }
    }
    formData.append('user_name', action.payload.user_name);
    try {
        const res = yield call(fetch, action.uri,
            {
                method: 'POST',
                body: formData
            });

        const json = yield call([res, 'json']); //retrieve body of response
        if (json.success) {
            action.callback();
            yield put(SnackActions.openSnackBar(true, 'Review submitted successfully'));
        } else
            yield put(SnackActions.openSnackBar(false, json.message));
    } catch (e) {
        yield put(SnackActions.openSnackBar(false, e.toString()));
    }
}

function* deleteReview(action) {
    console.log('MainSaga, deleteReview=', action);
    try {
        const res = yield call(fetch, action.uri,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },

                body: JSON.stringify({"review_id":`${action.payload.review_id}`}),
            });
        const json = yield call([res, 'json']); //retrieve body of response
        yield put(SnackActions.openSnackBar(true, json.data.message));
        
    } catch (e) {
        yield put(SnackActions.openSnackBar(false, e.toString()));
    }
}

function* editReview(action) {
    console.log('MainSaga, editReview=', action);
    try {
        const res = yield call(fetch, action.uri,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },

                body: JSON.stringify(action.payload.review)
            });
        const json = yield call([res, 'json']); //retrieve body of response
        yield put(MainActions.loadUserReviewsSuccess(json.data));
        yield put(SnackActions.openSnackBar(true, "Successfully update"));
    } catch (e) {
        yield put(SnackActions.openSnackBar(false, e.toString()));
    }
}


//generate function
function* MainSaga() {
    //using takeEvery, you take the action away from reducer to saga
    yield takeEvery(MainActionsConstants.LOADֹֹֹ_USER_PROFILES, loadUserProfiles);
    yield takeEvery(MainActionsConstants.LOADֹֹֹ_USER_REVIEWS, loadUserReviews);
    yield takeEvery(MainActionsConstants.LOADֹֹֹ_RESTAURANT_REVIEWS, loadRestaurantReviews);
    yield takeEvery(MainActionsConstants.EDIT_USER_PROFILE, editUserProfile);
    yield takeEvery(MainActionsConstants.SUBMIT_REVIEW, submitReview);
    yield takeEvery(MainActionsConstants.DELETE_REVIEW, deleteReview);
    yield takeEvery(MainActionsConstants.EDIT_REVIEW, editReview);


}

export default MainSaga;

  
