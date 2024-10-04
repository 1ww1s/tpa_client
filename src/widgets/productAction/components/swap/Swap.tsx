"use client"

import { FC, useEffect, useRef, useState } from "react";
import { SendDetailedData } from "@/src/features/sendDetailedData";
import { LoaderDiv } from "@/src/shared/components/loaderDiv/LoaderDiv";
import { SwapItems } from "@/src/features/swapItems";
import { IProductItem, productService } from "@/src/entities/product";
import { SelectGroup } from "@/src/features/changingProduct";
import classes from './swap.module.scss'

interface SwapProps {
    isLoading: boolean; 
    setIsLoading: (isLoading: boolean) => void;
    selectedWidget: number;
    setSelectedWidget: (selectedWidget: number) => void;
}

export const Swap: FC<SwapProps> = ({setSelectedWidget, selectedWidget, setIsLoading, isLoading}) => {

    const [items, setItems] = useState<IProductItem[]>([])
    const [groupName, setGroupName] = useState<string>('')
    const [isLoadingItems, setIsLoadingItems] = useState<boolean>(false)

    const getProductItems = async (slug: string) => {
        try{
            setIsLoadingItems(true)
            // await new Promise(resolve => setTimeout(resolve, 7000))
            const items = await productService.getItemsOfGroup(slug)
            setItems(items)
        }
        catch(e){
            console.log(e)
        }
        finally{
            setIsLoadingItems(false)
        }
    }

    const first = useRef(true)
    useEffect(() => {
        if(first.current)
            first.current = false
        else
            getProductItems(groupName)
    }, [groupName])

    return (
        <div className={classes.swap}>
            <h3>Поменять местами разделы продукции</h3>
            <SelectGroup groupName={groupName} setGroupName={setGroupName} disabled={isLoading || isLoadingItems} />
            <div className={classes.swapItems}>
                {   
                    items.length === 0 && groupName
                        ?
                    <p>Ничего не найдено</p>
                        :
                    isLoadingItems
                        ?
                    <LoaderDiv height={200} />
                        :
                    <SwapItems items={items} setItems={setItems} />   
                }
            </div>
            <hr />
            <SendDetailedData 
                action='update'
                onEnd={() => setSelectedWidget(selectedWidget + 1)} 
                setIsLoading={setIsLoading}
                isLoading={isLoading}
                sendData={async () => await productService.swap(items)}
            />
        </div>
    )
}