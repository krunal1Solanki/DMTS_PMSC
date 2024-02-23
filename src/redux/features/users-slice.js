import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    value : {
        users : []
    }
}
export const users = createSlice({
    name : "users",
    initialState,
    reducers: {
        getUsers: (state, action) => {
            return {
                value : {
                    users : action.payload
                }
            }
        }
    }
})

export const {getUsers} = users.actions;
export default users.reducer;