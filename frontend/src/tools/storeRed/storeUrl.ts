import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    whtUrl: "/"
};

export const urlSlice = createSlice({
    name: 'whtUrl',
    initialState,
    reducers: {
        urlHome: (state) => {
            state.whtUrl = "/";
        },
        urlGames: (state) => {
            state.whtUrl = "/games";
        },
        urlAdmin: (state) => {
            state.whtUrl = "/admin";
        }
    }
});

export const { urlHome, urlGames, urlAdmin } = urlSlice.actions;

export default urlSlice.reducer;