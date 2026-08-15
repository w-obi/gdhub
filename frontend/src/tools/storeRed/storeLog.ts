import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLog: false
};

export const logSlice = createSlice({
    name: 'isLog',
    initialState,
    reducers: {
        logUser: (state) => {
            state.isLog = true;
        },
        exitUser: (state) => {
            state.isLog = false;
        }
    }
});

export const { logUser, exitUser } = logSlice.actions;

export default logSlice.reducer;