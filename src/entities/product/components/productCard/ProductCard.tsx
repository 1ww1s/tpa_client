import React, { FC } from "react";
import { IProduct } from "../../model/types";
import classes from './productCard.module.scss'
import { ProductFunctions } from "../productFunctions/ProductFunctions";
import { ProductMonAndIndParams } from "../productMonAndIndParams/ProductMonAndIndParams";
import { ProductDeliverySet } from "../productDeliverySet/ProductDeliverySet";
import { ProductModifications } from "../productModifications/ProductModifications";
import { ProductInfo } from "../productInfo/ProductInfo";
import { ProductTechCharacteristics } from "../productTechCharacteristics/ProductTechCharacteristics";
import { ProductSize } from "../size/Size";

interface ProductCardProps {
    product: IProduct
}

export const ProductCard: FC<ProductCardProps> = ({product}) => {

    return (
        <div className={classes.productCard}>
            { Boolean(product.info) && <ProductInfo info={product.info} /> }
            { Boolean(product.functions) && <ProductFunctions functions={product.functions} /> }
            { Boolean(product.monAndIndParams) && <ProductMonAndIndParams monAndIndParams={product.monAndIndParams} /> }
            { Boolean(product.techCharacteristics.data.length) && <ProductTechCharacteristics techCharacteristics={product.techCharacteristics} />}
            { Boolean(product.modifications.length) && <ProductModifications modifications={product.modifications} /> }
            { Boolean(product.deliverySet.length) && <ProductDeliverySet deliverySet={product.deliverySet} /> }
            { Boolean(product.deliverySet.length) && <ProductDeliverySet deliverySet={product.deliverySet} /> }
            { Boolean(product.size.url) && <ProductSize size={product.size} /> }
        </div>
    )
}