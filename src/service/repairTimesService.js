import React from 'react';
import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

export const showRepairTimes = createAsyncThunk(
    'repairTimes/showRepairTimes',
    async () => {
        let res = await axios.get('http://localhost:8080/repair-times')
        return res.data
    }
)

export const createRepairTime = createAsyncThunk(
    'repairTimes/createRepairTime',
    async (data) => {
        const res = await axios.post('http://localhost:8080/repair-times', data)
        return res.data
    }
)

export const removeRepairTime = createAsyncThunk(
    'repairTimes/removeRepairTime',
    async (id) => {
        let res = await axios.delete('http://localhost:8080/repair-times/' + id)
        return res.data
    }
)

export const showByHomeId = createAsyncThunk(
    'repairTimes/showByHomeId',
    async (id) => {
        let res = await axios.get('http://localhost:8080/repair-times/' + id)
        return res.data
    }
)