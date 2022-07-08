import { createAsyncThunk, createReducer } from '@reduxjs/toolkit'
import axios from 'axios'


export const getReservations = createAsyncThunk("GET_RESERVATIONS", (id) => {
    return axios.get(`/api/reservations/office/${id}`)
        .then(res => res.data)
})

export const getUserReservationsFuturas = createAsyncThunk("GET_USER_RESERVATIONS_FUTURAS", () => {
    const userId = JSON.parse(localStorage.getItem('user')).user._id
    return axios.get(`/api/reservations/users/date/${userId}/`)
        .then(res => res.data)
})

export const getUserReservationsAnteriores = createAsyncThunk("GET_USER_RESERVATIONS_ANTERIORES", () => {
    const userId = JSON.parse(localStorage.getItem('user')).user._id
    return axios.get(`/api/reservations/users/${userId}/date`)
        .then(res => res.data)
})

const ReservationReducer = createReducer({}, {
    [getReservations.fulfilled]: (state, action) => action.payload,
    [getUserReservationsFuturas.fulfilled]: (state, action) => action.payload,
    [getUserReservationsAnteriores.fulfilled]: (state, action) => action.payload
});

export default ReservationReducer;