import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    students: null
}

const studentInfoSlice = createSlice({
    name:'student_info',
    initialState,
    reducers:{
        getStudent:(state,action)=>{
            state.students = action.payload
        }
    }
})

export const {getStudent} = studentInfoSlice.actions
export default studentInfoSlice.reducer