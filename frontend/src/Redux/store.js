import { configureStore } from '@reduxjs/toolkit'
import userSlice from './Slices/userSlice'
import  taskSlice  from './Slices/taskSlice'


export const store = configureStore({
  reducer: {
    user:userSlice,
    task:taskSlice
  }
})