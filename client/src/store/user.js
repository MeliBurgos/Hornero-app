import { createAsyncThunk, createReducer } from '@reduxjs/toolkit'
import axios from 'axios'

export const userRegister = createAsyncThunk("USER_REGISTER", (data) => {
    return axios.post("/api/users/register", data)
        .then(user => user.data)
});

export const getUser = createAsyncThunk("GET_USER", () => {
    return axios.get(`/api/users/62b5cb24f3eb5cd956bdc6ae`)
        .then(user => user.data)

})

const userReducer = createReducer({}, {
    [userRegister.fulfilled]: (state, action) => action.payload,
    [getUser.fulfilled]: (state, action) => action.payload
});

export default userReducer;