"use client"

import { FC, useEffect, useRef, useState } from "react";
import classes from './siteSearch.module.scss'
import clear from '../lib/assets/x-close.png'
import { IProductItem, productService } from "@/src/entities/product";
import { siteSearchService } from "../api/SiteSearchService";

interface SiteSearchProps {
    setItems: (items: IProductItem[]) => void;
}

export const SiteSearch: FC<SiteSearchProps> = ({setItems}) => {

    const [value, setValue] = useState<string>('')
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const getProductPreview = async (name: string) => {
        try{
            setIsLoading(true)
            const items = await siteSearchService.get<IProductItem>(name, async (value) => await productService.getArrayByName<IProductItem>(value))
            setItems(items)
        }
        catch(e){
            console.log(e)
        }
        finally{
            setIsLoading(false)
        }
    }

    const ref = useRef(false)
    useEffect(() => {
        if(ref.current){
            getProductPreview(value)
        }
        ref.current = true;
    }, [value])

    return (
        <div className={classes.siteSearch}>
            

            <input value={value} onChange={(e) => setValue(e.target.value)} type='text' />
            <img className={classes.clear} src={clear.src} onClick={() => {setValue('')}} />
        </div>
    )
}