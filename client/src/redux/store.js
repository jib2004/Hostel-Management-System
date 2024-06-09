import { configureStore,combineReducers } from '@reduxjs/toolkit'
import userSliceReducer from './userSlice/userSlice'
import {persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import persistStore from 'redux-persist/es/persistStore'



const rootReducer = combineReducers({
    user:userSliceReducer,
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