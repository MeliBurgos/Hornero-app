import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import userReducer from './user'; 
import OfficesReducer from './offices'; 
import friendsReducer from './friends';

const store = configureStore({
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(logger),
    reducer: {
        user: userReducer,
        offices: OfficesReducer,
        friends: friendsReducer
    }
});

export default store;