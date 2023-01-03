import {createSlice} from "@reduxjs/toolkit";
import {createImg, showImagesByHomeId, showListImage} from "../../service/imageService";

const initialState = {
    listImage: []
}
const imageSlice = createSlice({
    name: 'image',
    initialState,
    extraReducers: builder => {
        builder.addCase(showListImage.fulfilled, (state, action) => {
            state.listImage = [...action.payload]
        })
        builder.addCase(showImagesByHomeId.fulfilled, (state, action) => {
            state.listImage = [...action.payload]
        })
        builder.addCase(createImg.fulfilled, (state, action) => {
            state.listImage.push(action.payload)
        })
    }
})
export default imageSlice.reducer