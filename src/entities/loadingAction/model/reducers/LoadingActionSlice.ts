import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { LoadingActionState } from "../types";



export const initialState: LoadingActionState = {
    loadingAction: {value: false},
    isLoading: false,
    error: ''
}

export const LoadingActionSlice = createSlice({
    name: 'loadingAction',
    initialState,
    reducers: {
        setLoadingAction(state, action: PayloadAction<boolean>){
            state.loadingAction.value = action.payload;
        },
    }
})

export default LoadingActionSlice.reducer