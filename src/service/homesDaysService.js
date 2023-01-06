import React from 'react';
import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

export const createHomesDays = createAsyncThunk(
    'homesDays/createHomesDays',
    async (data) => {
        let res = await axios.post('http://localhost:8080/homes-days', data)
        return res.data
    }
)

export const checkHomesDays = createAsyncThunk(
    'homesDays/checkHomesDays',
    async (data) => {
        let res = await axios.post('http://localhost:8080/homes-days/check', data)
        return res.data
    }
)

export const checkTimeHomesDays = createAsyncThunk(
    'homesDays/checkTimeHomesDays',
    async (data) => {
        let res = await axios.post('http://localhost:8080/homes-days/check-time', data)
        return res.data
    }
)

export const removeHomesDays = createAsyncThunk(
    'homesDays/removeHomesDays',
    async (id) => {
        console.log(id)
        let res = await axios.delete('http://localhost:8080/homes-days/' + id)
        return res.data
    }
)