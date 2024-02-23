import {configureStore} from '@reduxjs/toolkit'
import authReducer from './features/auth-slice';
import userReducer from './features/users-slice'
import siteReducer from './features/activeSites-slice'
export const store = configureStore({
    reducer : {
        authReducer,
        userReducer,
        siteReducer
    }
})
export default store;   