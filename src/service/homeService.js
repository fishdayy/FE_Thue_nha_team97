import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

export const showListHome = createAsyncThunk(
    'home/showListHome',
    async (data) => {
        const res = await axios.get('http://localhost:8080/homes')
        return res.data
    }
)

export const showHome = createAsyncThunk(
    'home/showHome',
    async (id) => {
        const res = await axios.get('http://localhost:8080/homes/' + id)
        return res.data
    }
)

export const showYourHomes = createAsyncThunk(
    'home/showYourHomes',
    async (id) => {
        const res = await axios.get('http://localhost:8080/homes/list-home/' + id)
        return res.data
    }
)

export const showHomesByCategory = createAsyncThunk(
    'home/showHomesByCategory',
    async (id) => {
        const res = await axios.get('http://localhost:8080/homes/find-by-category/' + id)
        return res.data
    }
)

export const showHomesByAddress = createAsyncThunk(
    'home/showHomesByAddress',
    async (data) => {
        const res = await axios.post('http://localhost:8080/homes/find-homes', data)
        return res.data
    }
)

export const createHome = createAsyncThunk(
    'homes/createHome',
    async (data) => {
        const res = await axios.post("http://localhost:8080/homes", data)
        return res.data
    }
)

export const removeHome = createAsyncThunk(
    'homes/removeHome',
    async (id) => {
        const res = await axios.delete('http://localhost:8080/homes/' + id)
        return {...res.data.payload, id}
    }
)