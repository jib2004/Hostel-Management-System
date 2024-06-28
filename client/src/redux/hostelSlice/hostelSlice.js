import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    currentHostel:null
}

const hostelSlice = createSlice({
    name:'hostel',
    initialState,
    reducers:{
        getHostel:(state,action)=>{
            state.currentHostel = action.payload
        }
    }
})

export const  {getHostel} = hostelSlice.actions 

export default hostelSlice.reducer