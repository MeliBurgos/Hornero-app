import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import userReducer from './user'; 
import OfficesReducer from './offices'; 
import friendsReducer from './friends';
import favoritesReducer from './favorites';
import ReservationReducer from './reservations';
import darkModeReducer from './darkMode';
import selectedFloorReducer from './selectedFloor';

const store = configureStore({
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
          }).concat(logger),
    reducer: {
        user: userReducer,
        offices: OfficesReducer,
        reservations: ReservationReducer,
        friends: friendsReducer,
        favorites: favoritesReducer,
        darkMode: darkModeReducer,
        selectedFloor: selectedFloorReducer
    }
});

export default store;