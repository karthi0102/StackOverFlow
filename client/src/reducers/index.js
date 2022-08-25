import { combineReducers } from "redux";
import authReducer from "./auth";
import questionsReducer from "./question";
import usersReducer from "./usersReducer";
import currentUserReducer from './currentUser'
export default combineReducers({
    authReducer,
    currentUserReducer,
    questionsReducer,
    usersReducer
})

