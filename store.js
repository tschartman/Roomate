import { configureStore } from '@reduxjs/toolkit'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist'
import taskReducer from './src/reducers/TaskReducer';
import UserReducer from './src/reducers/UserReducer';
import AuthenticationReducer from './src/reducers/AuthenticationReducer';
import HouseReducer from './src/reducers/HouseReducer';
import persistStore from 'redux-persist/es/persistStore';


const persistConfig = {
  key: 'root',
  storage: AsyncStorage
}

const reducers = combineReducers({
  authentication: AuthenticationReducer,
  task: taskReducer,
  user: UserReducer,
  house: HouseReducer
})

const persistedReducer = persistReducer(persistConfig, reducers)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware({
    serializableCheck: false
  })
})

export const persistor = persistStore(store)