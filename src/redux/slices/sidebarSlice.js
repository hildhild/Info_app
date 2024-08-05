import { createSlice } from "@reduxjs/toolkit";

export const sidebarSlice = createSlice({
    name: "sidebar",
    initialState: {
        showSidebar : false
    },
    reducers: {
        showSidebar: (state) => {
            state.showSidebar = true;
        },
        closeSidebar: (state) => {
            state.showSidebar = false;
        }
    }
});

export const { showSidebar, closeSidebar } = sidebarSlice.actions;

export default sidebarSlice.reducer;
