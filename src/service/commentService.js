import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

export const showComment = createAsyncThunk(
    'contract/showComment',
    async (id) => {
        let res = await axios.get('http://localhost:8080/comment/' + id)
        return res.data
    }
)
export const createComment = createAsyncThunk(
    'contract/createComment',
    async (data) => {
        let res = await axios.post('http://localhost:8080/comment',data)
        return res.data
    }
)