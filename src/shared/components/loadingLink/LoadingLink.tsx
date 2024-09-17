"use client"

import { FC } from "react";
import classes from './loadingLink.module.scss'
import { LoadingScreen } from "../loadingScreen/LoadingScreen";
import { useAppSelector } from "../../lib/hooks/redux";

export const LoadingLink: FC = () => {

    const {loadingAction} = useAppSelector(state => state.LoadingActionReducer)

    if(!loadingAction.value) return <></>
 
    return (
        <LoadingScreen />
    )
}