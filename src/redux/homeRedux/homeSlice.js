import {createSlice} from "@reduxjs/toolkit";
import {
    createHome, removeHome,
    showHome,
    showHomesByAddress,
    showHomesByCategory,
    showListHome,
    showYourHomes
} from "../../service/homeService";

const initialState = {
    listHome: []
}
const homeSlice = createSlice({
    name: 'home',
    initialState,
    extraReducers: builder => {
        builder.addCase(showListHome.fulfilled, (state, action) => {
            state.listHome = [...action.payload]
        })
        builder.addCase(showHome.fulfilled, (state, action) => {
            state.listHome = [...action.payload]
        })
        builder.addCase(showYourHomes.fulfilled, (state, action) => {
            console.log(action.payload)
            state.listHome = [...action.payload]
        })
        builder.addCase(showHomesByCategory.fulfilled, (state, action) => {
            state.listHome = [...action.payload]
        })
        builder.addCase(showHomesByAddress.fulfilled, (state, action) => {
            state.listHome = [...action.payload]
        })
        builder.addCase(createHome.fulfilled, (state, action) => {
            state.listHome.push(action.payload)
        })
        builder.addCase(removeHome.fulfilled, (state, action) => {
            state.listHome = state.listHome.filter(item => item.id !== action.payload.id)
        })
    }
})
export default homeSlice.reducer