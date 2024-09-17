import React, { ComponentProps, FC, useEffect } from "react";
import classes from './myInput.module.scss'
import clear from '@/src/shared/lib/assets/x-close-black.png'

interface MyInputProps {
    value: string;
    setValue: (value: string) => void;
    error?: string;
    setError?: (value: string) => void;
    required?: boolean; 
}

export const MyInput: FC<ComponentProps<"input"> & MyInputProps> = (
    {value, error = '', setError = () => {}, setValue, onChange = () => {}, required = false, ...props}
) => {

    return (
        <div className={classes.inputBox}>
            <input 
                onFocus={(e)=>{
                    e.target.classList.toggle(classes.active)
                }}
                onBlur={(e)=>{
                    e.target.classList.toggle(classes.active)
                }} 
                onClick={() => setError('')} 
                value={value} 
                onChange={e => {setValue(e.target.value); setError('')}}
                {...props} 
                className={classes.myInput} 
            />
            <img className={classes.clear} src={clear.src} data-disabled={!props.disabled} onClick={() => {if(!props.disabled) setValue('')}} />
            <div className={classes.error}>{error && '*'}{error || (required && !value && '*Обязательное поле')}</div>
        </div>
    )
}