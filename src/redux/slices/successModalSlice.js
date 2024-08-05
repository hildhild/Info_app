import { createSlice } from "@reduxjs/toolkit";

export const successModalSlice = createSlice({
    name: "successModal",
    initialState: {
        openModal : false
    },
    reducers: {
        openModal: (state) => {
            state.openModal = true;
        },
        closeModal: (state) => {
            state.openModal = false;
        }
    }
});

export const { openModal, closeModal } = successModalSlice.actions;

export default successModalSlice.reducer;
