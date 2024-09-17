"use client"

import { useEffect, useState } from "react";
import classes from './sortByField.module.scss'
import { ICertificate } from "@/src/entities/certificate";

interface SortByFieldProps<T> {
    initialItems: T[];
    setItems: (items: T[]) => void;
    field: keyof T;
    title?: string;
}

export const SortByField = <T, >(props: SortByFieldProps<T>) => {

    const [checked, setChecked] = useState<boolean>(false)

    useEffect(() => {
        if(checked){
            const newItems = [...props.initialItems].sort((a, b) => (a[props.field] as string).localeCompare(b[props.field] as string))
            props.setItems(newItems)
        }
        else{
            props.setItems(props.initialItems)
        }
    }, [checked, props.initialItems])

    return (
        <div className={classes.sort}>
            <label>
                <span>{props.title}</span>
                <input checked={checked} onChange={e => setChecked(e.target.checked)} type='checkbox' />
            </label>
        </div>
    )
}