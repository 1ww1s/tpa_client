"use client"

import { OpenModal } from "@/src/features/openModal";
import { FC, useEffect, useState } from "react";
import plus from '@/src/shared/lib/assets/plus-square.png'
import classes from './action.module.scss'
import { chooseWidgets, Timeline } from "@/src/features/timeline";
import { SearchAndSelection } from "../searchAndSelection/SearchAndSelection";
import { SuccessAction } from "@/src/shared/components/successAction/SuccessAction";
import { AddOrDelete } from "../addOrDelete/AddOrDelete";
import { initialStateProductPreview, IProductPreview } from "@/src/entities/product";

interface LatestDevelopmentsActionProps {
    action: 'create' | 'delete'
}

export const LatestDevelopmentsAction: FC<LatestDevelopmentsActionProps> = ({action}) => {

    const [productPreview, setProductPreview] = useState<IProductPreview>(initialStateProductPreview)
    const [selectedWidget, setSelectedWidget] = useState<number>(0)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [open, setOpen] = useState<boolean>(false)

    const actionName = action === 'create' ? 'Добавить' : 'Удалить';
    const actionNameSuccess = action === 'create' ? 'добавлена' : 'удалена';

    useEffect(() => {
        setProductPreview(initialStateProductPreview)
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
                            [
                                <SearchAndSelection 
                                    action={action}
                                    isLoading={isLoading}
                                    setIsLoading={setIsLoading}
                                    setProductPreview={setProductPreview}
                                    selectedWidget={selectedWidget}
                                    setSelectedWidget={setSelectedWidget}
                                />,
                                <AddOrDelete 
                                    title={actionName + ' последнюю разработку'}
                                    productPreview={productPreview}
                                    action={action}
                                    isLoading={isLoading}
                                    setIsLoading={setIsLoading}
                                    selectedWidget={selectedWidget}
                                    setSelectedWidget={setSelectedWidget}
                                />,
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