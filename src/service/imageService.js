import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

export const showListImage = createAsyncThunk(
    'image/showListImage',
    async (data) => {
        const res = await axios.get('http://localhost:8080/imageHomes')
        return res.data
    }
)

export const showImagesByHomeId = createAsyncThunk(
    'image/showImagesByHomeId',
    async (id) => {
        const res = await axios.get('http://localhost:8080/imageHomes/' + id)
        return res.data
    }
)

export const createImg = createAsyncThunk(
    'imgURLs/createImg',
    async (data) => {
        const res = await axios.post("http://localhost:8080/imageHomes", data)
        return res.data
    }
);