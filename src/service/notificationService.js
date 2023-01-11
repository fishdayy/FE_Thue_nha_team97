import React from 'react';
import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

export const showNotifications = createAsyncThunk(
    'notification/showNotifications',
    async (id)=>{
        let res=  await axios.get('http://localhost:8080/notifications/' + id)
        return res.data
    }
)

export const createNotification = createAsyncThunk(
    'notification/createNotification',
    async (data) => {
        const res = await axios.post("http://localhost:8080/notifications", data)
        return res.data
    }
)