"use client"

import { FC } from "react";
import burgerIcon from '../lib/assets/burger.png'
import Image from "next/image";
import classes from './burger.module.scss'

interface BurgerProps {
    open: boolean;
    setOpen: (open: boolean) => void;
}

export const Burger: FC<BurgerProps> = ({open, setOpen}) => {

    const toggleMenu = () => {
        if(open)
            setOpen(false)
        else
            setOpen(true)
    }

    return(
        <div onClick={toggleMenu} className={classes.burger}>
            <Image src={burgerIcon.src} width={24} height={24} alt="Открыть меню" />
        </div>
    )
}