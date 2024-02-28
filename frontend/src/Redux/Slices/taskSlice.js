import { createSlice } from "@reduxjs/toolkit";
import axios from '../../axiosConfig/axios'

const initialState = {
    task: null,
    allTask: [],
    userTask: [],
}

export const taskSlice = createSlice({
    name: "task",
    initialState,
    reducers: {
        createTask: (state, action) => {
            // // // console.log(action.payload)
            state.task = action.payload
            state.allTask = [action.payload.data, ...state.allTask]
            state.error = null

        },
        allUserTask: (state, action) => {
            state.allTask = action.payload.task
            state.error = null
        },
        userTask: (state, action) => {
            state.userTask = action.payload
            state.error = null
        },
        editTask: (state, action) => {

        },
        deleteTask: (state, action) => {

        }

    }
})

export const { createTask, allUserTask, userTask, editTask, deleteTask } = taskSlice.actions;

export const createTaskAsync = (taskData) => async (dispatch) => {
    try {
        let response = await axios.post("/createTask", taskData)
        dispatch(createTask(response.data))
        // console.log(response);
    }
    catch (err) {
        // console.log(err.response)
    }
}

export const allUserTaskAsync = () => async (dispatch) => {
    try {
        let response = await axios.get("/allTask")
        dispatch(allUserTask(response.data))
        // console.log(response);
    } catch (err) {
        // console.log(err.response)
    }
}

export const userTaskAsync = () => async (dispatch) => {
    try {
        let response = await axios.get("/userTask")
        dispatch(userTask(response.data))
        // console.log(response);
    } catch (err) {
        // console.log(err.response)
    }
}

export const editTaskAsync = (taskData, id) => async (dispatch) => {
    try {
        let response = await axios.post(`/editTask/${id}`, taskData)
        dispatch(editTask(response.data))
        // console.log(response);
        dispatch(userTaskAsync())
    }
    catch (err) {
        // console.log(err.response)
    }
}

export const deleteTaskAsync = (id) => async (dispatch) => {
    try {
        let response = await axios.get(`/deleteTask/${id}`)
        dispatch(deleteTask(response.data))
        // console.log(response);
        dispatch(userTaskAsync())
    }
    catch (err) {
        // console.log(err.response)
    }
}



export default taskSlice.reducer;