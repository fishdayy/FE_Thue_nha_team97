import {createSlice} from "@reduxjs/toolkit";
import {
    createContract,
    removeContract,
    showContracts,
    showContractsByUserCreate,
    showIncome
} from "../../service/contractService";

const initialState = {
    listContract: [],
    income: "0"
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
        builder.addCase(removeContract.fulfilled, (state, action) => {
            state.listContract = state.listContract.filter(item => item.id !== action.payload.id)
        })
    }
})
export default contractSlice.reducer