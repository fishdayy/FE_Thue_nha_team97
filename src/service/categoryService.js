import React from 'react';
import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

export const showCategories = createAsyncThunk(
    'category/showCategories',
    async ()=>{
        let res=  await axios.get('http://localhost:8080/categories')
        return res.data
    }
)