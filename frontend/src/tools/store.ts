import { configureStore } from '@reduxjs/toolkit';
import logReducer from './storeRed/storeLog';
import roleReducer from './storeRed/storeUsrRole';

export const store = configureStore({
    reducer: {
        auth: logReducer,
        role: roleReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;