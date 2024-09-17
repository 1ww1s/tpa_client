"use client"

import { useEffect, useRef, useState } from "react";
import classes from './getDataByName.module.scss'
import { MyInput } from "@/src/shared/components/myInput/MyInput";
import { searchByNameService } from "../api/SearchByNameService";

interface GetDataByNameProps<T> {
    setItems: (items: T[]) => void;
    getData: (name: string) => Promise<T[]>;
    setIsLoading: (isLoading: boolean) => void;
    isLoading: boolean;
    disabled?: boolean;
}

type Q = {name?: string, title?: string, value?: string}

export const GetDataByName = <T extends Q, >(props: GetDataByNameProps<T>) => {

    const [name, setName] = useState<string>('') 

    const getData = async (name: string) => {
        try{
            props.setIsLoading(true)
            const items = await searchByNameService.get(name, props.getData)
            console.log(123412, items)
            props.setItems(items)
        }
        catch(e){
            console.log(e)
        }
        finally{
           props.setIsLoading(false)
        }
    }

    const ref = useRef(false)
    useEffect(() => {
        if(ref.current){
            getData(name)
        }
        ref.current = true;
    }, [name])

    return (
        <div className={classes.search}>
            <div className={classes.input}>
                <MyInput value={name} setValue={setName} placeholder='Название...' disabled={props.disabled} />
            </div>
        </div>
    )
}