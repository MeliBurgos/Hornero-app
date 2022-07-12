import { createAsyncThunk, createReducer } from '@reduxjs/toolkit'
import axios from 'axios'


export const getReservations = createAsyncThunk("GET_RESERVATIONS", (id) => {
    return axios.get(`/api/reservations/office/${id}`)
        .then(res => res.data)
})

export const newReservation = createAsyncThunk("NEW_RESERVATION", (reserv) => {
    return axios.post(`/api/reservations`, reserv)
})

export const cancelReservation = createAsyncThunk("CANCEL_RESERVATION", (reserveId) => {
    return axios.delete(`/api/reservations/${reserveId}`)
})

const ReservationReducer = createReducer(null, {
    [getReservations.fulfilled]: (state, action) => action.payload
});

export default ReservationReducer;