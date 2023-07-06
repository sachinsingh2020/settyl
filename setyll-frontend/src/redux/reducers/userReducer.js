import { createAction, createReducer } from '@reduxjs/toolkit';

const loginRequest = createAction('loginRequest');
const loginSuccess = createAction('loginSuccess');
const loginFail = createAction('loginFail');
const registerRequest = createAction('registerRequest');
const registerSuccess = createAction('registerSuccess');
const registerFail = createAction('registerFail');
const isUserLoggedInRequest = createAction('isUserLoggedInRequest');
const isUserLoggedInSuccess = createAction('isUserLoggedInSuccess');
const isUserLoggedInFail = createAction('isUserLoggedInFail');
const logoutRequest = createAction('logoutRequest');
const logoutSuccess = createAction('logoutSuccess');
const logoutFail = createAction('logoutFail');
const getMyDetailsRequest = createAction('getMyDetailsRequest');
const getMyDetailsSuccess = createAction('getMyDetailsSuccess');
const getMyDetailsFail = createAction('getMyDetailsFail');
const getAllUsersRequest = createAction('getAllUsersRequest');
const getAllUsersSuccess = createAction('getAllUsersSuccess');
const getAllUsersFail = createAction('getAllUsersFail');

const clearError = createAction('clearError');
const clearMessage = createAction('clearMessage');

export const userReducer = createReducer({}, (builder) => {
    builder
        .addCase(loginRequest, (state) => {
            state.loading = true;
        })
        .addCase(loginSuccess, (state, action) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.user = action.payload.user;
            state.message = action.payload.message;
        })
        .addCase(loginFail, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(registerRequest, (state) => {
            state.loading = true;
        })
        .addCase(registerSuccess, (state, action) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.user = action.payload.user;
            state.message = action.payload.message;
        })
        .addCase(registerFail, (state, action) => {
            state.loading = false;
            state.isAuthenticated = false;
            state.error = action.payload;
        })
        .addCase(isUserLoggedInRequest, (state) => {
            state.loading = true;
        })
        .addCase(isUserLoggedInSuccess, (state, action) => {
            state.loading = false;
            state.isAuthenticated = action.payload.isAuthenticated;
        })
        .addCase(isUserLoggedInFail, (state, action) => {
            state.loading = false;
            state.isAuthenticated = false;
            state.error = action.payload;
        })
        .addCase(logoutRequest, (state) => {
            state.loading = true;
        })
        .addCase(logoutSuccess, (state, action) => {
            state.loading = false;
            state.isAuthenticated = false;
            state.user = null;
            state.message = action.payload.message;
        })
        .addCase(logoutFail, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(getMyDetailsRequest, (state) => {
            state.loading = true;
        })
        .addCase(getMyDetailsSuccess, (state, action) => {
            state.loading = false;
            state.me = action.payload.user;
        })
        .addCase(getMyDetailsFail, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(getAllUsersRequest, (state) => {
            state.loading = true;
        })
        .addCase(getAllUsersSuccess, (state, action) => {
            state.loading = false;
            state.users = action.payload.users;
        })
        .addCase(getAllUsersFail, (state, action) => {
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