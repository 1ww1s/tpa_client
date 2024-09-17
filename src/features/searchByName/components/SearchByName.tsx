"use client"

import { MyInput } from "@/src/shared/components/myInput/MyInput";
import { useEffect, useState } from "react";
import classes from './searchByName.module.scss'

interface SearchByNameProps<T> {
    items: T[];
    field: keyof T;
    setItems: (items: T[]) => void;
}

export const SearchByName = <T extends {}>(props: SearchByNameProps<T>) => {
    
    const [name, setName] = useState<string>('')

    useEffect(() => {
        props.setItems(props.items.filter(i => (i[props.field] as string).startsWith(name)))
    }, [name])

    return (
        <div className={classes.search}>
            <MyInput 
                value={name}
                setValue={setName}
                placeholder="Название..."
            />
        </div>
    )
}