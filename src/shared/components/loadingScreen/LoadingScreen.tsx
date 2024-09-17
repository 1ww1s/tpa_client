"use client"

import { FC, useEffect } from "react";
import classes from './loadingScreen.module.scss'
import { LoaderSpinner } from "../loaderSpinner/LoaderSpinner";


export const LoadingScreen: FC = () => {

    useEffect(() => {
        document.body.style.overflow="hidden"     
        return () => {
            document.body.style.overflow="visible"
        }
    }, [])

    return (
        <div className={classes.loadingScreen}>
            <LoaderSpinner />
        </div>
    )
}