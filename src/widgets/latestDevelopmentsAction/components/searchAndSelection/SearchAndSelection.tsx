"use client"

import { IProductItem, IProductPreview, productService } from "@/src/entities/product";
import { GetDataByName } from "@/src/features/getDataByName";
import { SelectFromList } from "@/src/features/selectFromList";
import { FC, useEffect, useState } from "react";
import classes from './searchAndSelection.module.scss'
import { SearchByName } from "@/src/features/searchByName";
import { latestDevelopmentsService } from "@/src/entities/latestDevelopment";

interface SearchProps {
    action: 'create' | 'delete';
    isLoading: boolean; 
    setIsLoading: (isLoading: boolean) => void;
    setProductPreview: (productPreview: IProductPreview) => void;
    setSelectedWidget: (selectedWidget: number) => void;
    selectedWidget: number;
}

export const SearchAndSelection: FC<SearchProps> = ({action, isLoading, setIsLoading, setProductPreview, selectedWidget, setSelectedWidget}) => {

    const [products, setProducts] = useState<IProductItem[]>([])
    const [productsSearch, setProductsSearch] = useState<IProductItem[]>([])

    const getLatestDevelopments = async () => {
        try{    
            setIsLoading(true)
            const latestDevelopments = await latestDevelopmentsService.getItems()
            setProducts(latestDevelopments)
            setProductsSearch(latestDevelopments)
        }
        catch(e){
            console.log(e)
        }
        finally{
            setIsLoading(false)
        }
    }

    const onSelected = async (selected: IProductItem) => {
        try{
            setIsLoading(true)
            const productPreview = await productService.getPreview(selected.slug)
            setProductPreview(productPreview)
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
            {
                action === 'create'
                    ?
                <GetDataByName 
                    isLoading={isLoading}
                    setIsLoading={setIsLoading}
                    getData={async (name: string) => await productService.getArrayByName<IProductItem>(name)}
                    setItems={setProductsSearch}
                />
                    :
                <SearchByName 
                    items={products}
                    setItems={setProductsSearch}
                    field={'name'}
                />
            }
            <hr />
            <SelectFromList 
                items={productsSearch}
                field={'name'}
                onSelected={onSelected}
                isLoading={isLoading}
            />
        </div>
    )
}