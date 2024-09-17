"use client"

import { MyModal } from "@/src/shared/components/myModal/MyModal";
import React, { FC, PropsWithChildren, useState } from "react";
import classes from './openModal.module.scss'

interface OpenModalProps {
    iconSrc: string;
    title: string
    openGlobal?: boolean;
    setOpenGlobal?: (val: boolean) => void;
}

export const OpenModal: FC<OpenModalProps & PropsWithChildren> = ({title, iconSrc, children, openGlobal, setOpenGlobal}) => {

    const [open, setOpen] = ((openGlobal !== undefined) && setOpenGlobal) ? [openGlobal, setOpenGlobal] : useState<boolean>(false);

    return (
        <div>
            <div onClick={() => setOpen(true)} className={classes.openModal} >
                <img src={iconSrc} />
                <h4>{title}</h4>
            </div>
            <MyModal open={open} close={() => setOpen(false)}>
                {children}
            </MyModal>
        </div>
    )
}