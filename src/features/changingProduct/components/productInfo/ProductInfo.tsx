"use client"

import React, { FC, useEffect, useState } from "react";
import classes from './productInfo.module.scss'
import { MyTextatea } from "@/src/shared/components/myTextarea/MyTextarea";
import { validationSizeSetValue } from "@/src/shared/lib/helpers/validationSizeSetValue";

interface ProductInfoProps {
    info: string;
    setInfo: (info: string) => void;
    required?: boolean; 
    setGlobalError?: (error: string) => void; 
}

export const ProductInfo: FC<ProductInfoProps> = ({info, setInfo, required = false, setGlobalError = () => {}}) => {

    const [error, setError] = useState<string>('')
    const setValue = validationSizeSetValue(400, setError, setInfo)

    useEffect(() => {
        if(!info) setGlobalError('Заполните обязательные поля')
    }, [info])
    
    return (
        <div>
            <p data-title="title">Описание</p>
            <div className={classes.textareaDiv}>
                <div className={classes.textarea}>
                    <MyTextatea 
                        placeholder="Для ДРА с электронным блоком управления EDC7..." 
                        value={info} 
                        setValue={val => {setValue(val); setGlobalError('')}}
                        error={(required && !info) ? "Обязательное поле" : error}
                    />
                </div>
                <div className={classes.showInfo}>
                    <p>{info}</p>
                </div>
            </div>
            <div className={classes.empty}>{}</div>
        </div>
    )
}