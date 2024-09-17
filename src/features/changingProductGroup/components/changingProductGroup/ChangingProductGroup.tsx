"use client"

import { FC } from "react";
import classes from './changingProductGroup.module.scss'
import { MyInput } from "@/src/shared/components/myInput/MyInput";
import { IProductGroup } from "@/src/entities/productGroup";

interface ChangingProductGroupProps {
    productGroup: IProductGroup;
    setProductGroup: (productGroup: IProductGroup) => void;
    uploadImage: React.ReactElement;
}

export const ChangingProductGroup: FC<ChangingProductGroupProps> = ({productGroup, setProductGroup, uploadImage}) => {

    return (
        <div className={classes.form}>
            <p data-title="title">Введите название раздела</p>
            <MyInput 
                value={productGroup.title} 
                setValue={(title) => setProductGroup({...productGroup, title})} 
                type='text' 
                placeholder='Системы ДАУ "ПАРУС"' 
                required
            />
            <p data-title="title">Введите описание раздела</p>
            <MyInput 
                value={productGroup.info} 
                setValue={(info => setProductGroup({...productGroup, info}))} 
                type='text' 
                placeholder="Описание" 
                required
            />
            <p data-title="title">Фотография</p>
            {uploadImage}
        </div>
    )
}