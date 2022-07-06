import { createAsyncThunk, createReducer } from '@reduxjs/toolkit'
import axios from 'axios'


export const getReservations = createAsyncThunk("GET_RESERVATIONS", (id) => {
    return axios.get(`/api/reservations/office/${id}`)
        .then(res => res.data)
})

const ReservationReducer = createReducer({}, {
    [getReservations.fulfilled]: (state, action) => action.payload
});

export default ReservationReducer;