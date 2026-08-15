import { configureStore } from '@reduxjs/toolkit';
import logReducer from './storeRed/storeLog';
import urlReducer from './storeRed/storeUrl';

export const store = configureStore({
    reducer: {
        auth: logReducer,
        prevurl: urlReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;