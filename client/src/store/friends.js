import { createAsyncThunk, createReducer } from '@reduxjs/toolkit'
import axios from 'axios'

export const getFriends = createAsyncThunk("GET_FRIENDS", (id) => {
    // const userId = JSON.parse(localStorage.getItem('user'))._id
    return axios.get(`/api/friends/${id}`)
        .then(user => user.data)
})

export const addFriend = createAsyncThunk("ADD_FRIEND", (ids) => {
    // const userId = JSON.parse(localStorage.getItem('user'))._id
    const {id,userIdToAdd} = ids
    console.log("ID",id,typeof(id))
    console.log("userIdToAdd",userIdToAdd,typeof(userIdToAdd))
    return axios.post(`/api/friends/add/${id}/${userIdToAdd}`)
        .then(user => user.data)
})

export const removeFriend = createAsyncThunk("REMOVE_FRIEND", (ids) => {
    // const userId = JSON.parse(localStorage.getItem('user'))._id
    const {id,userIdToDelete} = ids
    return axios.delete(`/api/friends/remove/${id}/${userIdToDelete}`)
        .then(user => user.data)
})

export const sendMailToFriend = createAsyncThunk("SEND_MAIL_TO_FRIEND", (mailData) => {
    // mailData = {mailFrom:'Nombre Apellido', mailTo: 'destinatario@globant.com', mailBody:'cuerpo del mail'}
    return axios.post(`/api/friends/sendMail`,mailData)
        .then(user => user.data)
})

export const searchFriends = createAsyncThunk("SEARCH_FRIENDS", (searchInput) => {
    return axios.get(`/api/friends/search/${searchInput}`)
        .then(user => user.data)
})


const friendsReducer = createReducer({}, {
    [getFriends.fulfilled]: (state, action) => action.payload,
});

export default friendsReducer;