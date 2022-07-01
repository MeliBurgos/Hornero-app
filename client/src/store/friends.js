import { createAsyncThunk, createReducer } from '@reduxjs/toolkit'
import axios from 'axios'

export const getFriends = createAsyncThunk("GET_FRIENDS", (id) => {
    // const userId = JSON.parse(localStorage.getItem('user'))._id
    return axios.get(`/api/friends/${id}`)
        .then(res => res.data)
})

export const addFriend = createAsyncThunk("ADD_FRIEND", (ids) => {
    // const userId = JSON.parse(localStorage.getItem('user'))._id
    const {id,userIdToAdd} = ids
    return axios.post(`/api/friends/add/${id}/${userIdToAdd}`)
})

export const removeFriend = createAsyncThunk("REMOVE_FRIEND", (ids) => {
    // const userId = JSON.parse(localStorage.getItem('user'))._id
    const {id,userIdToDelete} = ids
    return axios.delete(`/api/friends/remove/${id}/${userIdToDelete}`)
})

export const sendMailToFriend = createAsyncThunk("SEND_MAIL_TO_FRIEND", (mailData) => {
    // mailData = {mailFrom:'Nombre Apellido', mailTo: 'destinatario@globant.com', mailBody:'cuerpo del mail'}
    console.log("MAILDATA",mailData)
    return axios.post(`/api/friends/sendMail`, mailData)
})

export const searchFriends = createAsyncThunk("SEARCH_FRIENDS", (searchInput) => {
    return axios.get(`/api/friends/search/${searchInput}`)
        .then(user => user.data)
})


const friendsReducer = createReducer({}, {
    [getFriends.fulfilled]: (state, action) => action.payload,
});

export default friendsReducer;