import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isLoading: false,
    error:null,
    currentUser:null
}

const userSlice = createSlice({
    name:"student",
    initialState,
    reducers:{
        isSignInStart:(state,action)=>{
            state.isLoading = true
        },
        isSignInSuccess:(state,action)=>{
            state.isLoading = false
            state.currentUser = action.payload
        },
        isSignInFailure:(state,action)=>{
            state.isLoading = false
            state.error = action.payload
        },

    }
})


export const {isSignInStart,isSignInSuccess,isSignInFailure} = userSlice.actions
export default userSlice.reducer
