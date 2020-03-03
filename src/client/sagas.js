import { all } from 'redux-saga/effects'
import AppSaga from './components/App/saga'
import LoginSaga from './components/Login/saga'
import MainSaga from './components/MainPage/saga'

export default function* Sagas() {
    yield all([
        AppSaga(),
        LoginSaga(),
        MainSaga(),
    ])
}
