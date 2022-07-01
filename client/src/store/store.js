import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import userReducer from './user'; 
import OfficesReducer from './offices'; 

const store = configureStore({
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(logger),
    reducer: {
        user: userReducer,
        offices: OfficesReducer
    }
});

export default store;