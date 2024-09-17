"use client"

import { OpenModal } from "@/src/features/openModal";
import { FC, useEffect, useState } from "react";
import plus from '@/src/shared/lib/assets/plus-square.png'
import classes from './requisiteAction.module.scss'
import { chooseWidgets, Timeline } from "@/src/features/timeline";
import { SearchAndSelection } from "../searchAndSelection/SearchAndSelection";
import { Delete } from "../delete/Delete";
import { SuccessAction } from "@/src/shared/components/successAction/SuccessAction";
import { ChangingRequisiteAndSendData } from "../changingRequisiteAndSendData/ChangingRequisiteAndSendData";
import { initialStateRequisite, IRequisite } from "@/src/entities/requisite";

interface RequisiteActionProps {
    action: 'create' | 'update' | 'delete'
}

export const RequisiteAction: FC<RequisiteActionProps> = ({action}) => {

    const [requisite, setRequisite] = useState<IRequisite>(initialStateRequisite)
    const [selectedWidget, setSelectedWidget] = useState<number>(0)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [open, setOpen] = useState<boolean>(false)

    const actionName = action === 'create' ? 'Добавить' : action === 'update' ? 'Обновить' : 'Удалить';
    const actionNameSuccess = action === 'create' ? 'добавлен' : action === 'update' ? 'обновлен' : 'удален';

    useEffect(() => {
        setRequisite(initialStateRequisite)
        setSelectedWidget(0)
    }, [open])

    useEffect(() => {
        if(selectedWidget === 0){
            setRequisite(initialStateRequisite)
        }
    }, [selectedWidget])

    return (
        <div data-actions>
            <OpenModal title={actionName + ' реквизит'} iconSrc={plus.src} openGlobal={open} setOpenGlobal={setOpen} >
                <div className={classes.form}>
                    <Timeline 
                        selectedWidget={selectedWidget}
                        setSelectedWidget={setSelectedWidget}
                        isLoading={isLoading}
                        widgets={
                            [...chooseWidgets(action, 
                                <SearchAndSelection 
                                    setRequisite={setRequisite}
                                    selectedWidget={selectedWidget}
                                    setSelectedWidget={setSelectedWidget}
                                />,
                                <ChangingRequisiteAndSendData 
                                    title={actionName + ' реквизит'}
                                    requisite={requisite}
                                    setRequisite={setRequisite}
                                    action={action}
                                    isLoading={isLoading}
                                    setIsLoading={setIsLoading}
                                    selectedWidget={selectedWidget}
                                    setSelectedWidget={setSelectedWidget}
                                />,
                                <Delete 
                                    requisite={requisite}
                                    selectedWidget={selectedWidget}
                                    setSelectedWidget={setSelectedWidget}
                                    isLoading={isLoading}
                                    setIsLoading={setIsLoading}
                                />
                            ),
                                <div className={classes.successAction}>
                                    <SuccessAction title={`Реквизит успешно ${actionNameSuccess}`} />
                                </div>
                            ] 
                        } 
                    />
                </div>
        
            </OpenModal>
        </div>
    )
}