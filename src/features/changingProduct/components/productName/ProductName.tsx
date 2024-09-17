"use client"

import { MyInput } from "@/src/shared/components/myInput/MyInput";
import React, { FC, useEffect, useState } from "react";
import classes from './productName.module.scss'
import { validationSizeSetValue } from "@/src/shared/lib/helpers/validationSizeSetValue";

interface ProductNameProps {
    name: string;
    setName: (name: string) => void;
    required?: boolean; 
    setGlobalError?: (error: string) => void; 
}

export const ProductName: FC<ProductNameProps> = ({name, setName, required = false, setGlobalError = () => {}}) => {

    const [error, setError] = useState<string>('')

    const setValue = validationSizeSetValue(200, setError, setName)

    useEffect(() => {
        if(!name) setGlobalError('Заполните обязательные поля')
    }, [name])

    return (
        <div className={classes.productName}>
            <p data-title="title">Название</p>
            <div className={classes.inputDiv}>
                <div className={classes.input}>
                    <MyInput 
                        value = {name} 
                        setValue = {val => {setValue(val); setGlobalError('')}}
                        placeholder = 'Система ДАУ "Парус-1.3-40"' 
                        error = {(required && !name) ? 'Обязательное поле' : error} 
                    />
                </div>
                <div className={classes.showName}>
                    <p>{name}</p>
                </div>
            </div>
        </div>
    )
} 