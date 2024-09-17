"use client"

import { FC, useState } from "react";
import classes from './changingRequisite.module.scss'
import { MyInput } from "@/src/shared/components/myInput/MyInput";
import { IRequisite } from "@/src/entities/requisite";

interface ChangingRequisiteProps {
    requisite: IRequisite;
    setName: (name: string) => void;
    setValue: (value: string) => void;
}


export const ChangingRequisite: FC<ChangingRequisiteProps> = ({requisite, setName, setValue}) => {



    return (
        <div className={classes.changingRequisite}>
            <p data-title="title">Введите название</p>
            <MyInput value={requisite.name} setValue={setName} placeholder="ИНН" />
            <p data-title="title">Введите значение</p>
            <MyInput value={requisite.value} setValue={setValue} placeholder="6901071311" />
        </div>
    )
}