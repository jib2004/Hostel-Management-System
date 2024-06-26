import { configureStore,combineReducers } from '@reduxjs/toolkit'
import userSliceReducer from './userSlice/userSlice'
import hostelSliceReducer from './hostelSlice/hostelSlice'
import defaultersInfoSlice from './studentInfoSlice/defaultersInfoSlice'
import studentInfoSliceReducer from './studentInfoSlice/studentInfoSlice'
import {persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import persistStore from 'redux-persist/es/persistStore'
import loadingSliceReducer from './loadingSlice/loadingSlice'



const rootReducer = combineReducers({
    user:userSliceReducer,
    student_info:studentInfoSliceReducer,
    defaulter:defaultersInfoSlice,
    hostel:hostelSliceReducer,
    loading:loadingSliceReducer
    

})
  

const persistConfig = {
    key:'root',
    storage,
    version:1
  }
  
  const persistantReducer = persistReducer(persistConfig,rootReducer)


export const store = configureStore({
    reducer: persistantReducer,
    middleware:(getDefaultMiddleware) => getDefaultMiddleware(
        {serializableCheck: false} //To prevent errors using redux-persist
    )
})

export const persistor = persistStore(store)