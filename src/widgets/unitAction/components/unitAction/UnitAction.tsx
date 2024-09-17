"use client"

import { OpenModal } from "@/src/features/openModal";
import { FC, useEffect, useState } from "react";
import plus from '@/src/shared/lib/assets/plus-square.png'
import classes from './unitAction.module.scss'
import { chooseWidgets, Timeline } from "@/src/features/timeline";
import { SearchAndSelection } from "../searchAndSelection/SearchAndSelection";
import { SuccessAction } from "@/src/shared/components/successAction/SuccessAction";
import { initialStateUnit, IUnit } from "@/src/entities/unit";
import { ChangingUnitAndSendData } from "../changingUnitAndSendData/ChangingUnitAndSendData";

interface ProductGroupActionProps {
    action: 'create' | 'update';
}

export const UnitAction: FC<ProductGroupActionProps> = ({action}) => {

    const [unit, setUnit] = useState<IUnit>(initialStateUnit)
    const [selectedWidget, setSelectedWidget] = useState<number>(0)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [open, setOpen] = useState<boolean>(false)

    const actionName = action === 'create' ? 'Добавить' : action === 'update' ? 'Обновить' : 'Удалить';
    const actionNameSuccess = action === 'create' ? 'добавлена' : action === 'update' ? 'обновлена' : 'удалена';

    useEffect(() => {
        setUnit(initialStateUnit)
        setSelectedWidget(0)
    }, [open])

    return (
        <div data-actions>
            <OpenModal title={actionName + ' единицу измерения'} iconSrc={plus.src} openGlobal={open} setOpenGlobal={setOpen} >
                <div className={classes.form}>
                    <Timeline 
                        selectedWidget={selectedWidget}
                        setSelectedWidget={setSelectedWidget}
                        isLoading={isLoading}
                        widgets={
                            [...chooseWidgets(action, 
                                <SearchAndSelection 
                                    isLoading={isLoading}
                                    setIsLoading={setIsLoading}
                                    setUnit={setUnit}
                                    selectedWidget={selectedWidget}
                                    setSelectedWidget={setSelectedWidget}
                                />,
                                <ChangingUnitAndSendData 
                                    title={actionName + ' единицу измерения'}
                                    unit={unit}
                                    setUnit={setUnit}
                                    action={action}
                                    isLoading={isLoading}
                                    setIsLoading={setIsLoading}
                                    selectedWidget={selectedWidget}
                                    setSelectedWidget={setSelectedWidget}
                                />,
                                <></>
                            ),
                                <div className={classes.successAction}>
                                    <SuccessAction title={`Единица измерения успешно ${actionNameSuccess}`} />
                                </div>
                            ] 
                        } 
                    />
                </div>
            </OpenModal>
        </div>
    )
}