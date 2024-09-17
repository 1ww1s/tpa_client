"use client"

import { FC, useEffect, useRef, useState } from "react";
import classes from './productMonAndIndParams.module.scss'
import { MyTextatea } from "@/src/shared/components/myTextarea/MyTextarea";
import { validationSizeSetValue } from "@/src/shared/lib/helpers/validationSizeSetValue";
import {Marked} from '@ts-stack/markdown'
import { OpenDiv } from "../openDiv/OpenDiv";


interface ProductMonAndIndParamsProps {
    monAndIndParams: string;
    setMonAndIndParams: (monAndIndParams: string) => void
}

export const ProductMonAndIndParams: FC<ProductMonAndIndParamsProps> = ({monAndIndParams, setMonAndIndParams}) => {

    const refMonAndIndParamsDiv = useRef<HTMLDivElement>(null)
    const refResult = useRef<HTMLDivElement>(null)
    const [error, setError] = useState<string>('')
    const setValue = validationSizeSetValue(5000, setError, setMonAndIndParams)

    useEffect(() => {
        transformation(monAndIndParams)
    }, [monAndIndParams])

    const transformation = (value: string) => {
        if(refResult.current)
            refResult.current.innerHTML = Marked.parse(value)
    }

    return (
        <div className={classes.productMonAndIndParams}>
            <OpenDiv title="Контроль и индикация параметров" toggleClasses={classes} refToggle={refMonAndIndParamsDiv} />
            <div ref={refMonAndIndParamsDiv} className={classes.monAndIndParamsDiv}>
                <div className={classes.textareaDiv}>
                    <MyTextatea 
                        value={monAndIndParams} 
                        placeholder="- частота вращения коленчатого вала...; - давление масла в дизеле...;"
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