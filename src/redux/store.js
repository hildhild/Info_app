import { combineReducers, configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from 'redux-persist'

import formReducer from './slices/formSlice';
import successModalReducer from './slices/successModalSlice';
import loginReducer from './slices/loginSlice';
import sidebarReducer from './slices/sidebarSlice';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['dashboard'],
}

const rootReducer = combineReducers({ 
    dashboard: formReducer,
    successModal: successModalReducer,
    loginStatus: loginReducer,
    sidebar: sidebarReducer
})
  
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        })
});

export const persistor = persistStore(store)