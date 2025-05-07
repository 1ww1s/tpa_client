"use client"

import { OpenModal } from "@/src/features/openModal";
import { FC, useEffect, useState } from "react";
import plus from '@/src/shared/lib/assets/plus-square.png'
import classes from './action.module.scss'
import { chooseWidgets, Timeline } from "@/src/features/timeline";
import { SearchAndSelection } from "../searchAndSelection/SearchAndSelection";
import { SuccessAction } from "@/src/shared/components/successAction/SuccessAction";
import { ILatestDevelopment, initialLatestDevelopment } from "@/src/entities/latestDevelopment";
import { Changing } from "../changing/Changing";
import { Delete } from "../delete/Delete";

interface LatestDevelopmentsActionProps {
    action: 'create' | 'delete'
}

export const LatestDevelopmentsAction: FC<LatestDevelopmentsActionProps> = ({action}) => {

    const [latestDevelopment, setLatestDevelopment] = useState<ILatestDevelopment>(initialLatestDevelopment)
    const [selectedWidget, setSelectedWidget] = useState<number>(0)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [open, setOpen] = useState<boolean>(false)

    const actionName = action === 'create' ? 'Добавить' : 'Удалить';
    const actionNameSuccess = action === 'create' ? 'добавлена' : 'удалена';

    useEffect(() => {
        setLatestDevelopment(initialLatestDevelopment)
        setSelectedWidget(0)
    }, [open])

    return (
        <div data-actions>
            <OpenModal title={actionName + ' последнюю разработку'} iconSrc={plus.src} openGlobal={open} setOpenGlobal={setOpen} >
                <div className={classes.form}>
                    <Timeline 
                        selectedWidget={selectedWidget}
                        setSelectedWidget={setSelectedWidget}
                        isLoading={isLoading}
                        widgets={
                        [...chooseWidgets(action, 
                            <SearchAndSelection 
                                action={action}
                                isLoading={isLoading}
                                setIsLoading={setIsLoading}
                                setLatestDevelopment={setLatestDevelopment}
                                selectedWidget={selectedWidget}
                                setSelectedWidget={setSelectedWidget}
                            />,
                            <Changing 
                                title={actionName + ' последнюю разработку'}
                                latestDevelopment={latestDevelopment}
                                setLatestDevelopment={setLatestDevelopment}
                                action={action}
                                isLoading={isLoading}
                                setIsLoading={setIsLoading}
                                selectedWidget={selectedWidget}
                                setSelectedWidget={setSelectedWidget}
                            />,
                            <Delete
                                latestDevelopment={latestDevelopment}
                                selectedWidget={selectedWidget}
                                setSelectedWidget={setSelectedWidget}
                                isLoading={isLoading}
                                setIsLoading={setIsLoading}
                            />
                        ),
                            <div className={classes.successAction}>
                                <SuccessAction title={`Последняя разработка ${actionNameSuccess}`} />
                            </div>
                        ]
                        } 
                    />
                </div>
            </OpenModal>
        </div>
    )
}