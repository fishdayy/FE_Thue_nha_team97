import {createSlice} from "@reduxjs/toolkit";
import {createComment, showComment} from "../../service/commentService";

const initialState ={
    listComment:[]
}

const commentSlice = createSlice({
    name:'comment',
    initialState,
    extraReducers:builder => {
        builder.addCase(showComment.fulfilled,(state,action)=>{
            state.listComment=[...action.payload]
        })
        builder.addCase(createComment.fulfilled, (state, action) => {
            state.listComment.push(action.payload.comment)
        })
    }
})
export default commentSlice.reducer