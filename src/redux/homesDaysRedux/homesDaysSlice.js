import {createSlice} from "@reduxjs/toolkit";
import {checkHomesDays, createHomesDays} from "../../service/homesDaysService";

const initialState = {
    listHomesDays: [],
    check: null
}
const homesDaysSlice = createSlice({
    name: 'homesDays',
    initialState,
    extraReducers: builder => {
        builder.addCase(createHomesDays.fulfilled, (state, action) => {
            state.listHomesDays = [...action.payload]
        })
        builder.addCase(checkHomesDays.fulfilled, (state, action) => {
            state.check = action.payload
        })
    }
})
export default homesDaysSlice.reducer