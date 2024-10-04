"use client"

import { FC, useEffect, useState } from "react";
import classes from './selectGroup.module.scss'
import { productGroupService } from "@/src/entities/productGroup";
import { MySelect } from "@/src/shared/components/mySelect/MySelect";

interface SelectGroupProps {
    groupName: string;
    setGroupName: (groupName: string) => void;
    required?: boolean;
    disabled?: boolean;
}

export const SelectGroup: FC<SelectGroupProps> = ({groupName, setGroupName, required = false, disabled = false}) => {

    const [groupNames, setGroupNames] = useState<{value: string, name: string}[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true)

    async function getGroupNames(){
        try{
            setIsLoading(true)
            const groupNames = await productGroupService.getNames()
            setGroupNames(groupNames)
        }
        catch(e){
            console.log(e)
        }
        finally{    
            setIsLoading(false)
        }
    }

    useEffect(() => {
        getGroupNames()
    }, [])



    return (
        <div className={classes.selectGroup}>
            <p data-title="title">Группа продукции</p>
            <div className={classes.selectDiv}>
                <MySelect 
                    disabled={isLoading || disabled}
                    defaultValue={'Выберите группу'} 
                    value={groupName} 
                    change={val => {setGroupName(val)}} 
                    options={groupNames} />
                <div className={classes.empty}>{required && !Boolean(groupName) && '*Обязательное поле'}</div>
            </div>
        </div>
    )
} 