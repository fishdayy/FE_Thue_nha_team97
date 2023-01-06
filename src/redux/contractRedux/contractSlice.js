import {createSlice} from "@reduxjs/toolkit";
import {createContract, showContracts, showContractsByUserCreate, showIncome} from "../../service/contractService";

const initialState = {
    listContract: [],
    income: ""
}

const contractSlice = createSlice({
    name: 'contract',
    initialState,
    extraReducers: builder => {
        builder.addCase(showContracts.fulfilled, (state, action) => {
            state.listContract = [...action.payload]
        })
        builder.addCase(createContract.fulfilled, (state, action) => {
            state.listContract.push(action.payload)
        })
        builder.addCase(showContractsByUserCreate.fulfilled, (state, action) => {
            state.listContract = [...action.payload]
        })
        builder.addCase(showIncome.fulfilled, (state, action) => {
            state.income = [...action.payload]
        })
    }
})
export default contractSlice.reducer