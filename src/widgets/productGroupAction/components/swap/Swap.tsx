"use client"

import { FC, useEffect, useState } from "react";
import { IProductGroupItem, productGroupService } from "@/src/entities/productGroup";
import { SendDetailedData } from "@/src/features/sendDetailedData";
import { LoaderDiv } from "@/src/shared/components/loaderDiv/LoaderDiv";
import { SwapItems } from "@/src/features/swapItems";

interface SwapProps {
    isLoading: boolean; 
    setIsLoading: (isLoading: boolean) => void;
    selectedWidget: number;
    setSelectedWidget: (selectedWidget: number) => void;
}

export const Swap: FC<SwapProps> = ({setSelectedWidget, selectedWidget, setIsLoading, isLoading}) => {

    const [items, setItems] = useState<IProductGroupItem[]>([])

    const getProductGroup = async () => {
        try{
            setIsLoading(true)
            const productGroup = await productGroupService.getItems()
            setItems(productGroup)
        }
        catch(e){
            console.log(e)
        }
        finally{
            setIsLoading(false)
        }
    }

    useEffect(() => {
        getProductGroup()
    }, [])

    return (
        <div>
            <h3>Поменять местами разделы продукции</h3>
            {isLoading && <LoaderDiv height={200} />}
            <SwapItems items={items} setItems={setItems} />
            <hr />
            <SendDetailedData 
                action='update'
                onEnd={() => setSelectedWidget(selectedWidget + 1)} 
                setIsLoading={setIsLoading}
                isLoading={isLoading}
                sendData={async () => await productGroupService.swap(items)}
            />
        </div>
    )
}