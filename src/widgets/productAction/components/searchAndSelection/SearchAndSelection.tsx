import { IProduct, IProductItem, IProductPreview, productService } from "@/src/entities/product";
import { GetDataByName } from "@/src/features/getDataByName";
import { SelectFromList } from "@/src/features/selectFromList";
import { FC, useState } from "react";
import classes from './searchAndSelection.module.scss'

interface SearchProps {
    action: 'create' | 'update' | 'delete';
    isBasic?: boolean;
    isLoading: boolean; 
    setIsLoading: (isLoading: boolean) => void;
    setProductPreview: (productPreview: IProductPreview) => void;
    setProduct: (product: IProduct) => void;
    setSelectedWidget: (selectedWidget: number) => void;
    selectedWidget: number;
}

export const SearchAndSelection: FC<SearchProps> = (
    {action, isBasic, isLoading, setIsLoading, setProductPreview, setProduct, selectedWidget, setSelectedWidget}
) => {

    const [products, setProducts] = useState<IProductItem[]>([])

    const onSelected = async (selected: IProductItem) => {
        try{
            setIsLoading(true)
            if(action === 'delete'){
                const productPreview = await productService.getPreview(selected.slug)
                setProductPreview(productPreview)
            }
            else{
                if(action === 'update' && isBasic){
                    const product = await productService.getBasic(selected.slug)
                    const images = await productService.getImages(selected.slug)
                    setProduct({...product, images})
                }
                else{
                    const product = await productService.getOptions(selected.slug)
                    setProduct(product)
                }
            }
            setSelectedWidget(selectedWidget + 1)
        }
        catch(e){
            console.log(e)
        }
        finally{
            setIsLoading(false)
        }
    }

    return (
        <div className={classes.search}>
            <h3>Найти продукт</h3>
            <GetDataByName 
                isLoading={isLoading}
                setIsLoading={setIsLoading}
                getData={async (name: string) => await productService.getArrayByName<IProductItem>(name)}
                setItems={setProducts}
            />
            <hr />
            <SelectFromList 
                items={products}
                field={'name'}
                onSelected={onSelected}
                isLoading={isLoading}
            />
        </div>
    )
}