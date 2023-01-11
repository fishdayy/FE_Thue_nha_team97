import {createSlice} from "@reduxjs/toolkit";
import {createNotification, showNotifications} from "../../service/notificationService";

const initialState = {
    listNotification: []
}
const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    extraReducers: builder => {
        builder.addCase(showNotifications.fulfilled, (state, action) => {
            state.listNotification = [...action.payload]
        })
        builder.addCase(createNotification.fulfilled, (state, action) => {
            state.listNotification.push(action.payload)
        })
    }
})
export default notificationSlice.reducer