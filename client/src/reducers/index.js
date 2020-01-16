import {combineReducers} from 'redux';
import alert from './alert';
import auth from './auth';
import profile from './profile';

export default combineReducers({
    alert,      // In reducers/alert.js, export default function is unnamed, so name defaults to filename
    auth,
    profile
});