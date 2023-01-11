import {createSlice} from "@reduxjs/toolkit";
import {
    changeStatus,
    createHome, editHome, removeHome,
    showHome,
    showHomesByAddress,
    showHomesByCategory, showHomesByTime,
    showListHome, showStar, showTop4,
    showYourHomes
} from "../../service/homeService";

const initialState = {
    listHome: [],
    detailHome: [],
    top4Home: [],
}
const homeSlice = createSlice({
    name: 'home',
    initialState,
    extraReducers: builder => {
        builder.addCase(showListHome.fulfilled, (state, action) => {
            state.listHome = [...action.payload]
        })
        builder.addCase(showHome.fulfilled, (state, action) => {
            state.detailHome = [...action.payload]
        })
        builder.addCase(showYourHomes.fulfilled, (state, action) => {
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
        builder.addCase(showTop4.fulfilled, (state, action) => {
            state.top4Home = [...action.payload]
        })
        builder.addCase(editHome.fulfilled, (state, action) => {
            console.log(action.payload)
        })
        builder.addCase(showHomesByTime.fulfilled, (state, action) => {
            state.listHome = [...action.payload]
        })
        builder.addCase(showStar.fulfilled, (state, action) => {
            state.detailHome = [...action.payload]
        })
    }
})
export default homeSlice.reducer