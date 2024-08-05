import { createSlice } from "@reduxjs/toolkit";

export const loginSlice = createSlice({
    name: "loginStatus",
    initialState: {
        logined : localStorage.getItem("token")
    },
    reducers: {
        login: (state) => {
            state.logined = true;
        },
        logout: (state) => {
            state.logined = false;
        }
    }
});

export const { login, logout } = loginSlice.actions;

export default loginSlice.reducer;
