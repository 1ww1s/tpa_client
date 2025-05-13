"use client"

import { FC } from "react";
import classes from './changingLatestDevelopment.module.scss'
import { MyInput } from "@/src/shared/components/myInput/MyInput";
import { ILatestDevelopment } from "@/src/entities/latestDevelopment";

interface Props {
    latestDevelopment: ILatestDevelopment;
    setLatestDevelopment: (latestDevelopment: ILatestDevelopment) => void;
    uploadImage: React.ReactElement;
}

export const ChangingLatestDevelopment: FC<Props> = ({latestDevelopment, setLatestDevelopment, uploadImage}) => {

    return (
        <div className={classes.form}>
            <p data-title="title">Введите название продукции</p>
            <MyInput 
                value={latestDevelopment.title} 
                setValue={(title) => setLatestDevelopment({...latestDevelopment, title})} 
                type='text' 
                placeholder='Система управления...' 
                required
            />
            <p data-title="title">Введите ссылку на продукцию</p>
            <MyInput 
                value={latestDevelopment.link} 
                setValue={(link => setLatestDevelopment({...latestDevelopment, link}))} 
                type='text' 
                placeholder="https://pfktpa.ru/product-catalog/sistemy-upravleniya" 
                required
            />
            <p data-title="title">Фотография</p>
            {uploadImage}
        </div>
    )
}