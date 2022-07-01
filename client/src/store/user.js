import { createAsyncThunk, createReducer } from '@reduxjs/toolkit'
import axios from 'axios'

export const userRegister = createAsyncThunk("USER_REGISTER", (data) => {
   return axios.post("/api/users/register", data)
        .then(user => user.data)
});

export const userUpdate = createAsyncThunk("USER_UPDATE", (data) => {
    return axios.put(`/api/users/${data[1]}`, data[0])
        .then(user => user.data)
});

export const getUser = createAsyncThunk("GET_USER", () => {
    // const userId = JSON.parse(localStorage.getItem('user'))._id
    return axios.get(`/api/users/62bcccb407b266cf048056c5`)
        .then(user => user.data)
})

export const userLogin = createAsyncThunk("USER_LOGIN", (data) => {
    return axios.post("/api/users/login", data)
        .then(user => {
            localStorage.setItem('user', JSON.stringify(user.data))
            return user.data
        });
});

export const userLogout = createAsyncThunk("USER_LOGOUT", () => {
    return axios.post("/api/users/logout")
        .then(user => user.data)
});


const userReducer = createReducer({}, {
    [userRegister.fulfilled]: (state, action) => action.payload,
    [userUpdate.fulfilled]: (state, action) => action.payload,
    [getUser.fulfilled]: (state, action) => action.payload,
    [userLogin.fulfilled]: (state, action) => action.payload,
    [userLogout.fulfilled]: (state, action) => action.payload,
});

export default userReducer;