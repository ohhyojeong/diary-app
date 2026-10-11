import { configureStore } from '@reduxjs/toolkit'
import diaryReducer from "./diarySlice";
import authReducer from './authSlice';

export const store = configureStore({
    reducer: {
        diary:diaryReducer,
        auth: authReducer
    }
})
