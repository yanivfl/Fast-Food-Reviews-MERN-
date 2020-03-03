import { combineReducers } from 'redux'
import AppReducer from './components/App/reducer'
import LoginReducer from './components/Login/reducer' 
import MainReducer from './components/MainPage/reducer'
import SnackBarReducer from './components/SnackBar/reducer'
import {reducer as reduxFormReducer} from 'redux-form'


export default combineReducers({
  app: AppReducer,
  login: LoginReducer,
  snackBar: SnackBarReducer,
  form: reduxFormReducer,
  main: MainReducer,
});
