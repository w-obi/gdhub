import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    role: "User"
};

export const usrSlice = createSlice({
    name: 'usr',
    initialState,
    reducers: {
        roleUser: (state) => {
            state.role = "User";
        },
        roleAdmin: (state) => {
            state.role = "Admin";
        }
    }
});

export const { roleUser, roleAdmin } = usrSlice.actions;

export default usrSlice.reducer;