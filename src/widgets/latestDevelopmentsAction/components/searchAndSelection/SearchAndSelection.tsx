"use client"

import { FC, useEffect, useState } from "react";
import classes from './searchAndSelection.module.scss'
import { ILatestDevelopment, ILatestItem, latestDevelopmentsService } from "@/src/entities/latestDevelopment";
import { GetDataByName } from "@/src/features/getDataByName";
import { SelectFromList } from "@/src/features/selectFromList";

interface SearchProps {
    action: 'create' | 'delete';
    isLoading: boolean; 
    setIsLoading: (isLoading: boolean) => void;
    setLatestDevelopment: (latestDevelopment: ILatestDevelopment) => void;
    setSelectedWidget: (selectedWidget: number) => void;
    selectedWidget: number;
}

export const SearchAndSelection: FC<SearchProps> = ({action, isLoading, setIsLoading, setLatestDevelopment, selectedWidget, setSelectedWidget}) => {

    const [items, setItems] = useState<ILatestItem[]>([])
    const [itemsSearch, setItemsSearch] = useState<ILatestItem[]>([])

    const getLatestDevelopments = async () => {
        try{    
            setIsLoading(true)
            const latestDevelopments = await latestDevelopmentsService.getItems()
            setItems(latestDevelopments)
            setItemsSearch(latestDevelopments)
        }
        catch(e){
            console.log(e)
        }
        finally{
            setIsLoading(false)
        }
    }

    const onSelected = async (selected: ILatestItem) => {
        try{
            setIsLoading(true)
            const latestDevelopment = await latestDevelopmentsService.get(selected)
            setLatestDevelopment(latestDevelopment)
            setSelectedWidget(selectedWidget + 1)
        }
        catch(e){
            console.log(e)
        }
        finally{
            setIsLoading(false)
        }
    }

    useEffect(() => {
        if(action==='delete'){
            getLatestDevelopments()
        }
    }, [])

    return (
        <div className={classes.search}>
            <h3>Найти продукт</h3>
            <SelectFromList 
                items={items}
                field={'title'}
                onSelected={onSelected}
                isLoading={isLoading}
            />
        </div>
    )
}