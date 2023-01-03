import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

export const register = createAsyncThunk(
    'user/register',
    async (data) => {
        const res = await axios.post("http://localhost:8080/users/register", data)
        return res.data
    }
)

export const loginFB = createAsyncThunk(
    'user/loginFB',
    async (data) => {
        const res = await axios.post('http://localhost:8080/users/fb-login', data)
        return res.data
    }
)
export const login = createAsyncThunk(
    'user/login',
    async (data) => {
        const res = await axios.post('http://localhost:8080/users/login', data)
        return res.data
    }
)

export const changePassword = createAsyncThunk(
    'user/changePassword',
    async (data) => {
        const res = await axios.post('http://localhost:8080/users/change-password/' + data.id, data)
        return res.data
    }
)

export const updateProfile = createAsyncThunk(
    'user/updateProfile',
    async (data) => {
        const res = await axios.post('http://localhost:8080/users/update-profile/' +data.id, data)
        return res.data
    }
)