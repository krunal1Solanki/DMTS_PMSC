import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    value : {
        sites : {},
    }
}
export const sites = createSlice({
    name : "sites",
    initialState,
    reducers: {
        getActiveSites: (state, action) => {
            return {
                value : {
                    sites : action.payload
                }
            }
        }
    }
})

export const {getActiveSites} = sites.actions;
export default sites.reducer;