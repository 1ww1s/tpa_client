"use client"

import React, { FC } from "react";
import classes from './changingProduct.module.scss'
import { IProduct, useProductActions } from "@/src/entities/product";
import { ProductName } from "../productName/ProductName";
import { ProductInfo } from "../productInfo/ProductInfo";
import { ProductImages } from "../productImages/ProductImages";
import { ProductFucntions } from "../productFunctions/ProductFunctions";
import { ProductMonAndIndParams } from "../productMonAndIndParams/ProductMonAndIndParams";
import { ProductTechCharacteristics } from "../productTechCharacteristics/ProductTechCharacteristics";
import { ProductModifications } from "../productModifications/ProductModifications";
import { ProductDeliverySet } from "../productDeliverySet/ProductDeliverySet";
import { SelectGroup } from "../selectGroup/SelectGroup";

interface ChangingProductProps {
    product: IProduct;
    setProduct: (product: IProduct) => void;
    addImg: React.ReactElement
}

export const ChangingProduct: FC<ChangingProductProps> = ({product, setProduct, addImg}) => {
    
    const {
        setName,
        setInfo,
        setImages,
        setFunctions,
        setMonAndIndParams,
        setTechCharacteristics,
        setModifications,
        setDeliverySet,
        setPoductGroup,
    } = useProductActions(product, setProduct)

    return (
        <div className={classes.form}>
            <SelectGroup groupName={product.groupName} setGroupName={setPoductGroup} required />
            <ProductName name={product.name} setName={setName} required  />
            <ProductInfo info={product.info} setInfo={setInfo} required />
            <ProductImages images={product.images} setImages={setImages} addImg={addImg} required  />
            <ProductFucntions functions={product.functions} setFunctions={setFunctions} />
            <ProductMonAndIndParams monAndIndParams={product.monAndIndParams} setMonAndIndParams={setMonAndIndParams} />
            <ProductTechCharacteristics techCharacteristics={product.techCharacteristics} setTechCharacteristics={setTechCharacteristics} />
            <ProductModifications modifications={product.modifications} setModifications={setModifications} />
            <ProductDeliverySet deliverySet={product.deliverySet} setDeliverySet={setDeliverySet} />
        </div>
    )
}