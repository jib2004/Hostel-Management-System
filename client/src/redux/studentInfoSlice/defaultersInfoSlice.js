import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    defaulter:null
}

const defaulterSlice = createSlice({
    name:"defaulter",
    initialState,
    reducers:{
        getDefaulters:(state,action)=>{
            state.student = action.payload
        }
    }
})

export const {getDefaulters}  = defaulterSlice.actions
export default defaulterSlice.reducer