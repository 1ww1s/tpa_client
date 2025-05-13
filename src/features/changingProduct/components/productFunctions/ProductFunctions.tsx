"use client"

import React, { FC, useEffect, useRef, useState } from "react";
import classes from './productFunctions.module.scss'
import { validationSizeSetValue } from "@/src/shared/lib/helpers/validationSizeSetValue";
import { MyTextatea } from "@/src/shared/components/myTextarea/MyTextarea";
import {Marked} from '@ts-stack/markdown'
import { OpenDiv } from "../openDiv/OpenDiv";


interface ProductFucntionsProps {
    functions: string;
    setFunctions: (functions: string) => void;
}

export const ProductFucntions: FC<ProductFucntionsProps> = ({functions, setFunctions}) => {

    const [error, setError] = useState<string>('')
    const setValue = validationSizeSetValue(5000, setError, setFunctions)
    const refResult = useRef<HTMLDivElement>(null)
    const refFunctionsDiv = useRef<HTMLDivElement>(null)

    useEffect(() => {
        transformation(functions)
    }, [functions])

    const transformation = (value: string) => {
        if(refResult.current)
            refResult.current.innerHTML = Marked.parse(value)
    }

    return (
        <div className={classes.productFunctions}>
           <OpenDiv title="Функции" refToggle={refFunctionsDiv} toggleClasses={classes} />
            <div ref={refFunctionsDiv} className={classes.functionsDiv}>
                <div className={classes.textareaDiv}>
                    <MyTextatea 
                        value={functions} 
                        placeholder="- бесступенчатое (плавное) изменение...; - дистанционное управление частотой...;"
                        setValue={setValue} 
                        error={error}
                    />
                </div>
                <div ref={refResult} className={classes.result}>
                </div>
            </div>
    </div>
    )
}