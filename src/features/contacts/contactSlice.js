import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    page: 1
}

const contactSlice = createSlice({
    name: 'contact',
    initialState,
    reducers: {
        changePage: (state, action) => {
            state.page = action.payload
        }
        
    }
})

export const {changePage} = contactSlice.actions;
export default contactSlice.reducer;