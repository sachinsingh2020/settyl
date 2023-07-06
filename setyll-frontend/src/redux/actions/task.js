import { server } from '../store'
import axios from 'axios'

export const getAllTasks = (keyword = "") => async (dispatch) => {
    try {
        dispatch({ type: 'getAllTasksRequest' });
        let link = "";
        link = `${server}/tasks?keyword=${keyword}`
        const { data } = await axios.get(link, {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        });
        dispatch({ type: 'getAllTasksSuccess', payload: data });
    }
    catch (error) {
        dispatch({ type: 'getAllTasksFail', payload: error.response.data.message });
    }
}

export const getMyTasks = () => async (dispatch) => {
    try {
        dispatch({ type: 'getMyTasksRequest' });
        const { data } = await axios.get(`${server}/mytasks`, {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        });
        dispatch({ type: 'getMyTasksSuccess', payload: data });
    }
    catch (error) {
        dispatch({ type: 'getMyTasksFail', payload: error.response.data.message });
    }
}

export const doneTask = (id, status) => async (dispatch) => {
    try {
        dispatch({ type: 'doneTaskRequest' });
        const { data } = await axios.put(`${server}/completed`, { id, status }, {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        });
        dispatch({ type: 'doneTaskSuccess', payload: data });
    }
    catch (error) {
        dispatch({ type: 'doneTaskFail', payload: error.response.data.message });
    }
}

export const createTask = (title, description, dueDate, selectedUsersStringify) => async (dispatch) => {
    try {
        dispatch({ type: 'createTaskRequest' });
        const { data } = await axios.post(`${server}/create`, {
            title,
            description,
            dueDate,
            assignedUsers: selectedUsersStringify
        }, {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        });
        dispatch({ type: 'createTaskSuccess', payload: data });
    }
    catch (error) {
        dispatch({ type: 'createTaskFail', payload: error.response.data.message });
    }
}

export const deleteTask = (id) => async (dispatch) => {
    try {
        // console.log(id);
        dispatch({ type: 'deleteTaskRequest' });
        const { data } = await axios.put(`${server}/delete`, { id }, {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        });
        dispatch({ type: 'deleteTaskSuccess', payload: data });
    }
    catch (error) {
        dispatch({ type: 'deleteTaskFail', payload: error.response.data.message });
    }
}

export const updateTask = (id, title, description, selectedUsersStringify) => async (dispatch) => {
    try {
        dispatch({ type: 'updateTaskRequest' });
        const { data } = await axios.put(`${server}/update`, {
            id,
            title,
            description,
            assignedUsers: selectedUsersStringify
        }, {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        });
        dispatch({ type: 'updateTaskSuccess', payload: data });
    }
    catch (error) {
        dispatch({ type: 'updateTaskFail', payload: error.response.data.message });
    }
}

export const getTaskStatus = () => async (dispatch) => {
    try {
        dispatch({ type: 'getTaskStatusRequest' });
        const { data } = await axios.get(`${server}/status`, {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        });
        dispatch({ type: 'getTaskStatusSuccess', payload: data });
    }
    catch (error) {
        dispatch({ type: 'getTaskStatusFail', payload: error.response.data.message });
    }
}