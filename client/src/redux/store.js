import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import productReducer from './slices/productSlice'
// import adminReducer from './slices/adminSlice'

const middleware = getDefaultMiddleware({immutableCheck: false})
export const store = configureStore({
    reducer: {
        auth: authReducer,
        products: productReducer
    },
    middleware
})