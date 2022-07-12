import { createAsyncThunk, createReducer } from '@reduxjs/toolkit'
import axios from 'axios'

export const getReservationsAdmin = createAsyncThunk("GET_RESERVATIONS", (id) => {
    return axios.get(`/api/reservations/office/${id}`)
        .then(res => res.data)
})

export const deleteReservationsAdmin = createAsyncThunk("DELETE_RESERVATIONS", (id) =>{
    console.log(id, "SOY")
    return axios.delete(`/api/reservations/${id}`)
        .then(res => res.data)
})

const adminReducer = createReducer(null, {
    [getReservationsAdmin.fulfilled]: (state, action) => action.payload,
    [deleteReservationsAdmin.fulfilled]: (state, action) => action.payload
});

export default adminReducer;