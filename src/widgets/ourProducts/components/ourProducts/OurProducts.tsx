import classes from './ourProducts.module.scss'
import { TitleWithSeparator } from "@/src/shared/components/titleWithSeparator/components/TitleWithSeparator";
import { ProductGroupBoxes } from "../productGroupBoxes/ProductGroupBoxes";
import { IProductGroup, productGroupService } from "@/src/entities/productGroup";
import { isDynamicServerError } from "next/dist/client/components/hooks-server-context";
import { FC } from 'react';

const getData = async () => {
    let productGroup: IProductGroup[] = [];
    try{
        productGroup = await productGroupService.fetchGetAll()
    }
    catch(error){
        if(isDynamicServerError(error)){
            throw error;
        }
        console.log(error)
    }
    return productGroup
}

export const OurProducts: FC = async () => {

    const productGroup = await getData()

    return (
        <div className={classes.ourProducts}>
            <div className="wrapper">   
                <TitleWithSeparator title="НАША ПРОДУКЦИЯ" />
                <div className={classes.productGroupBoxes}>
                    <ProductGroupBoxes productGroup={productGroup} />
                </div>
            </div>
        </div>
    )
}