import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    value : {
        isAuth : false,
        user : {},
    }
}
export const auth = createSlice({
    name : "auth",
    initialState,
    reducers: {
        logOut : () => {
            return initialState;
        },
        logIn: (state, action) => {
            return {
                value : {
                    isAuth : true,
                    user : action.payload
                }
            }
        }
    }
})

export const {logIn, logOut} = auth.actions;
export default auth.reducer;