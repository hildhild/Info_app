import { createSlice } from "@reduxjs/toolkit";

// let userData = {
//     name: '',
//     type: '',
//     publicPhone: '',
//     publicEmail: '',
//     address: ''
// };
// if (localStorage.getItem('user_data')){
//     userData = JSON.parse(localStorage.getItem('user_data'));
// } 

export const formSlice = createSlice({
    name: "form",
    initialState: {
        formData : {
            name: '',
            type: '',
            publicPhone: '',
            publicEmail: '',
            address: ''
        }
    },
    reducers: {
        formSubmit: (state, action) => {
            state.formData = action.payload;
        }
    }
});

export const { formSubmit } = formSlice.actions

export default formSlice.reducer;
