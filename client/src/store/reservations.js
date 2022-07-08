import { createAsyncThunk, createReducer } from '@reduxjs/toolkit'
import axios from 'axios'


export const getReservations = createAsyncThunk("GET_RESERVATIONS", (id) => {
    return axios.get(`/api/reservations/office/${id}`)
        .then(res => res.data)
})

export const getUserReservations = createAsyncThunk("GET_USER_RESERVATIONS", () => {
    const userId = JSON.parse(localStorage.getItem('user')).user._id
    return axios.get(`/api/reservations/users/${userId}/date`)
        .then(res => res.data)
})

const ReservationReducer = createReducer({}, {
    [getReservations.fulfilled]: (state, action) => action.payload,
    [getUserReservations.fulfilled]: (state, action) => action.payload
});

export default ReservationReducer;