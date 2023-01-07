import React from 'react';
import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

export const showContracts = createAsyncThunk(
    'contract/showContracts',
    async () => {
        let res = await axios.get('http://localhost:8080/contracts')
        return res.data
    }
)

export const showContractsByUserId = createAsyncThunk(
    'contract/showContracts',
    async (id) => {
        let res = await axios.get('http://localhost:8080/contracts/' + id)
        return res.data
    }
)

export const createContract = createAsyncThunk(
    'contracts/createContract',
    async (data) => {
        const res = await axios.post('http://localhost:8080/contracts', data)
        return res.data
    }
)

export const showContractsByUserCreate = createAsyncThunk(
    'contract/showContractsByUserCreate',
    async (id) => {
        let res = await axios.get('http://localhost:8080/contracts/show/' + id)
        return res.data
    }
)

export const showIncome = createAsyncThunk(
    'contract/showIncome',
    async (data) => {
        let res = await axios.post('http://localhost:8080/contracts/' + data.id, data)
        return res.data
    }
)
export const removeContract = createAsyncThunk(
    'contract/removeContract',
    async (id) => {
        let res = await axios.delete('http://localhost:8080/contracts/' + id)
        return res.data
    }
)