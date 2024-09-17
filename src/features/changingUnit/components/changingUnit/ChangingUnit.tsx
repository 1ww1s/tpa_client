"use client"

import React, { FC } from "react";
import classes from './changingUnit.module.scss'
import { MyInput } from "@/src/shared/components/myInput/MyInput";
import { IUnit } from "@/src/entities/unit";

interface ChangingUnitProps {
    unit: IUnit;
    setUnit: (unit: IUnit) => void;
}

export const ChangingUnit: FC<ChangingUnitProps> = ({unit, setUnit}) => {

    return (
        <div className={classes.form}>
           <MyInput 
                required
                value={unit.value} 
                setValue={(value: string) => setUnit({...unit, value})} 
                placeholder="Введите значение" 
            />
        </div>
    )
}