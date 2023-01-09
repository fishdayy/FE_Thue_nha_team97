import {createSlice} from "@reduxjs/toolkit";
import {changePassword, login, loginFB, register, updateProfile} from "../../service/userService";

const initialState = {
    userNow: JSON.parse(localStorage.getItem('user'))
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    extraReducers: builder => {
        builder.addCase(login.fulfilled, (state, action) => {
            state.userNow = action.payload
            localStorage.setItem('user', JSON.stringify(action.payload))
        })
        builder.addCase(loginFB.fulfilled, (state, action) => {
            state.userNow = action.payload
            localStorage.setItem('user',JSON.stringify(action.payload))
        })
        builder.addCase(changePassword.fulfilled, (state, action) => {
            state.userNow = action.payload
            localStorage.setItem('user', JSON.stringify(action.payload))
        })
        builder.addCase(updateProfile.fulfilled, (state, action) => {
            state.userNow = action.payload
            localStorage.setItem('user', JSON.stringify(action.payload))
        })
    }
})
export default userSlice.reducer