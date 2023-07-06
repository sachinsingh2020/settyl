import { createAction, createReducer } from '@reduxjs/toolkit';

const getAllTasksRequest = createAction('getAllTasksRequest');
const getAllTasksSuccess = createAction('getAllTasksSuccess');
const getAllTasksFail = createAction('getAllTasksFail');
const getMyTasksRequest = createAction('getMyTasksRequest');
const getMyTasksSuccess = createAction('getMyTasksSuccess');
const getMyTasksFail = createAction('getMyTasksFail');
const doneTaskRequest = createAction('doneTaskRequest');
const doneTaskSuccess = createAction('doneTaskSuccess');
const doneTaskFail = createAction('doneTaskFail');
const createTaskRequest = createAction('createTaskRequest');
const createTaskSuccess = createAction('createTaskSuccess');
const createTaskFail = createAction('createTaskFail');
const deleteTaskRequest = createAction('deleteTaskRequest');
const deleteTaskSuccess = createAction('deleteTaskSuccess');
const deleteTaskFail = createAction('deleteTaskFail');
const updateTaskRequest = createAction('updateTaskRequest');
const updateTaskSuccess = createAction('updateTaskSuccess');
const updateTaskFail = createAction('updateTaskFail');
const getTaskStatusRequest = createAction('getTaskStatusRequest');
const getTaskStatusSuccess = createAction('getTaskStatusSuccess');
const getTaskStatusFail = createAction('getTaskStatusFail');

const clearError = createAction('clearError');
const clearMessage = createAction('clearMessage');

export const taskReducer = createReducer({}, (builder) => {
    builder
        .addCase(getAllTasksRequest, (state) => {
            state.loading = true;
        })
        .addCase(getAllTasksSuccess, (state, action) => {
            state.loading = false;
            state.tasks = action.payload.tasks;
        })
        .addCase(getAllTasksFail, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(getMyTasksRequest, (state) => {
            state.loading = true;
        })
        .addCase(getMyTasksSuccess, (state, action) => {
            state.loading = false;
            state.myTasks = action.payload.tasks;
        })
        .addCase(getMyTasksFail, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(doneTaskRequest, (state) => {
            state.loading = true;
        })
        .addCase(doneTaskSuccess, (state, action) => {
            state.loading = false;
        })
        .addCase(doneTaskFail, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(createTaskRequest, (state) => {
            state.loading = true;
        })
        .addCase(createTaskSuccess, (state, action) => {
            state.loading = false;
            state.message = action.payload.message;
        })
        .addCase(createTaskFail, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(deleteTaskRequest, (state) => {
            state.deleteLoading = true;
        })
        .addCase(deleteTaskSuccess, (state, action) => {
            state.deleteLoading = false;
            state.message = action.payload.message;
        })
        .addCase(deleteTaskFail, (state, action) => {
            state.deleteLoading = false;
            state.error = action.payload;
        })
        .addCase(updateTaskRequest, (state) => {
            state.updateLoading = true;
        })
        .addCase(updateTaskSuccess, (state, action) => {
            state.updateLoading = false;
            state.message = action.payload.message;
        })
        .addCase(updateTaskFail, (state, action) => {
            state.updateLoading = false;
            state.error = action.payload;
        })
        .addCase(getTaskStatusRequest, (state) => {
            state.loading = true;
        })
        .addCase(getTaskStatusSuccess, (state, action) => {
            state.loading = false;
            state.completedTasks = action.payload.completedTasks;
            state.incompleteTasks = action.payload.incompleteTasks;
        })
        .addCase(getTaskStatusFail, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(clearError, (state) => {
            state.error = null;
        })
        .addCase(clearMessage, (state) => {
            state.message = null;
        })
})