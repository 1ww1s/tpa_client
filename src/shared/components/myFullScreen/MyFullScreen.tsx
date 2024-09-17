"use client"

import { FC, PropsWithChildren, useEffect } from "react";
import classes from './fullScreen.module.scss'
import closeImg from '@/src/shared/lib/assets/x-close-black.png'

interface FullScreenProps {
    open: boolean;
    setOpen: (open: boolean) => void;
}

export const MyFullScreen: FC<FullScreenProps & PropsWithChildren> = ({open, setOpen, children}) => {

    
    useEffect(() => {
        if(open){
            document.body.style.overflow="hidden"  
        }
        else{
            document.body.style.overflow="visible"
        }
        return () => {
            document.body.style.overflow="visible"
        }
    }, [open])
    
    if(!open) return <></>
    
    return (
        <div className={classes.fullScreen}>
            <div onClick={() => setOpen(false)} className={classes.close}>
                <img src={closeImg.src} />
            </div>
            <div className={classes.content}>
                {children}
            </div>
        </div>
    )
}