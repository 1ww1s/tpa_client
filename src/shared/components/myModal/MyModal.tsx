"use client"

import React, { FC, PropsWithChildren, useEffect, useRef } from "react";
import classes from './myModal.module.scss'
import x_close from '@/src/shared/lib/assets/x-close.png'

interface MyModalProps {
    open: boolean;
    close: () => void;
    maxWidth?: number;
}

export const MyModal: FC<PropsWithChildren<MyModalProps>> = ({children, open, maxWidth, close}) => {

    const myModalRef = useRef<HTMLDivElement>(null)
    useEffect(() => {
        if(open) {
            myModalRef.current?.classList.add(classes.open) 
            // document.body.style.overflow="hidden"         
            
        }
        else{
            myModalRef.current?.classList.remove(classes.open)
            // document.body.style.overflow="visible" 
        }
    }, [open])

    const closeModal = (e: React.MouseEvent<HTMLDivElement>) => {
        if(e.target === e.currentTarget){
            close()
        }
    }

    return (
        <div onClick={closeModal} ref={myModalRef} className={classes.myModal}>
            <div className={classes.content} style={{maxWidth: maxWidth}}>
                <img onClick={closeModal} src={x_close.src} alt="close" />
                {open && children}
            </div>
        </div>
    )
} 