import { useAppDispatch } from "@/src/shared/lib/hooks/redux";
import { bindActionCreators, Dispatch, ThunkDispatch } from "@reduxjs/toolkit";
import { LoadingActionSlice } from "../../model/reducers/LoadingActionSlice";


export const useLoadingAcions = () => {
    const dispatch = useAppDispatch()
    return bindActionCreators(LoadingActionSlice.actions, dispatch)
}