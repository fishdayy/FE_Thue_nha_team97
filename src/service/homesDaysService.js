import React from 'react';
import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

export const createHomesDays = createAsyncThunk(
    'homesDays/createHomesDays',
    async (data)=>{
        let res=  await axios.post('http://localhost:8080/homes-days', data)
        return res.data
    }
)

export const checkHomesDays = createAsyncThunk(
    'homesDays/checkHomesDays',
    async (data)=>{
        let res=  await axios.post('http://localhost:8080/homes-days/check', data)
        return res.data
    }
)