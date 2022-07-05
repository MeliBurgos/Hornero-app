import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import userReducer from './user'; 
import OfficesReducer from './offices'; 
import friendsReducer from './friends';
import favoritesReducer from './favorites';
import darkModeReducer from './darkMode';

const store = configureStore({
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
          }).concat(logger),
    reducer: {
        user: userReducer,
        offices: OfficesReducer,
        friends: friendsReducer,
        favorites: favoritesReducer,
        darkMode: darkModeReducer
    }
});

export default store;