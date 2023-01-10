import {createSlice} from "@reduxjs/toolkit";
import {createRepairTime, removeRepairTime, showByHomeId, showRepairTimes} from "../../service/repairTimesService";

const initialState = {
    listRepairTime: []
}

const repairTimesSlice = createSlice({
    name: 'repairTimes',
    initialState,
    extraReducers: builder => {
        builder.addCase(showRepairTimes.fulfilled, (state, action) => {
            state.listRepairTime = [...action.payload]
        })
        builder.addCase(createRepairTime.fulfilled, (state, action) => {
            state.listRepairTime.push(action.payload)
        })
        builder.addCase(removeRepairTime.fulfilled, (state, action) => {
            state.listRepairTime = state.listRepairTime.filter(item => item.id !== action.payload.id)
        })
        builder.addCase(showByHomeId.fulfilled, (state, action) => {
            state.listRepairTime = [...action.payload]
        })
    }
})
export default repairTimesSlice.reducer