import { useAppDispatch } from "@/src/shared/lib/hooks/redux";
import { bindActionCreators, Dispatch, ThunkDispatch } from "@reduxjs/toolkit";
import {UserSlice} from "../../model/reducers/UserSlice";


export const useUserAcions = () => {
    const dispatch = useAppDispatch()
    return bindActionCreators(UserSlice.actions, dispatch)
}