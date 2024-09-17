import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IUser, UserState } from "../types";



export const initialState: UserState = {
    user: {
        email: '',
        isAuth: false,
        roles: [],
    },
    isLoading: false,
    error: ''
}

export const UserSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<IUser>){
            state.user = action.payload;
        },
        setEmail(state, action: PayloadAction<string>){
            state.user.email = action.payload;
        },
        setIsAuth(state, action: PayloadAction<boolean>){
            state.user.isAuth = action.payload;
        }
    }
})

export default UserSlice.reducer