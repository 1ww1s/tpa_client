"use client"

import React, { FC, RefObject, useRef } from "react";

import { open } from "../../lib/helpers/open";
import classes from './openDiv.module.scss'
import arrowDown from '@/src/shared/lib/assets/arrow-down.png'

interface openDivProps {
    title: string;
    toggleClasses: {readonly [key: string]: string};
    refToggle: RefObject<HTMLDivElement>;
}

export const OpenDiv: FC<openDivProps> = ({title, toggleClasses, refToggle}) => {
    
    const refOpen = useRef<HTMLDivElement>(null)

    return (
        <div className={classes.openBox}>
            <div ref={refOpen} onClick={() => open(refToggle, toggleClasses, refOpen, classes)} className={classes.openDiv}>
                <p data-title="title">{title}</p>     
                <img data-img="arrow-down" src={arrowDown.src} />
            </div>
        </div>
    )
}