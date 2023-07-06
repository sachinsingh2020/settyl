import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from './reducers/userReducer';
import { taskReducer } from './reducers/taskReducer';


const store = configureStore({
    reducer: {
        user: userReducer,
        task: taskReducer,
    }
})

export default store

// export const server = "http://localhost:4000/api/v1"
export const server = "https://settyl-backend.vercel.app/api/v1"