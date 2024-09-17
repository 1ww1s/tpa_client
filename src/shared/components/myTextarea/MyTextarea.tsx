import React, { ComponentProps, FC } from "react";
import classes from './myTextarea.module.scss'

interface MyTextareaProps {
    value: string;
    error?: string;
    setValue: (value: string) => void;
    setError?: (value: string) => void;
}

export const MyTextatea: FC<ComponentProps<'textarea'> & MyTextareaProps> = (
    {
        value, 
        setValue, 
        error='', 
        setError=() => {},
        ...props
    }) => {
    return (
        <div className={classes.textareaBox}>
            <textarea 
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
                className={classes.myTextarea} 
            />
            <div className={classes.error}>{error && '*'}{error}</div>
        </div>
    )
}