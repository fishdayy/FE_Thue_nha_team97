import {createSlice} from "@reduxjs/toolkit";
import {showCategories} from "../../service/categoryService";

const initialState = {
    listCategory: []
}
const categorySlice = createSlice({
    name: 'category',
    initialState,
    extraReducers: builder => {
        builder.addCase(showCategories.fulfilled, (state, action) => {
            state.listCategory = [...action.payload]
        })
    }
})
export default categorySlice.reducer