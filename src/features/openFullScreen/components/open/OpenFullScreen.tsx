"use client"

import { FC, PropsWithChildren
    
 } from "react";
import classes from './openFullScreen.module.scss'

interface OpenFullScreenProps{
    setOpen: (open: boolean) => void;
    open: boolean;
    index: number;
    setIndex: (index: number) => void;
    highlight?: boolean;
}

export const OpenFullScreen: FC<OpenFullScreenProps & PropsWithChildren> = ({open, index, setIndex, setOpen, children, highlight = false}) => {

    const onOpen = () => {
        setOpen(true)
        setIndex(index)
    }

    return (
        <div onClick={onOpen} className = {classes.open} data-highlight = {highlight}>
            <div className={classes.plus}></div>
            {children}
        </div>
    )
}