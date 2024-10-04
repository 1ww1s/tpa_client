"use client"

import { OpenModal } from "@/src/features/openModal";
import { FC, useEffect, useState } from "react";
import plus from '@/src/shared/lib/assets/plus-square.png'
import classes from './productGroupAction.module.scss'
import { chooseWidgets, Timeline } from "@/src/features/timeline";
import { SearchAndSelection } from "../searchAndSelection/SearchAndSelection";
import { Delete } from "../delete/Delete";
import { SuccessAction } from "@/src/shared/components/successAction/SuccessAction";
import { ChangingProductGroupAndSendData } from "../changingProductGroupAndSendData/ChangingProductGroupAndSendData";
import { initialStateProductGroup, IProductGroup } from "@/src/entities/productGroup";
import { Swap } from "../swap/Swap";

interface ProductGroupActionProps {
    action: 'create' | 'update' | 'delete' | 'swap'
}

export const ProductGroupAction: FC<ProductGroupActionProps> = ({action}) => {

    const [productGroup, setProductGroup] = useState<IProductGroup>(initialStateProductGroup)
    const [selectedWidget, setSelectedWidget] = useState<number>(0)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [open, setOpen] = useState<boolean>(false)

    const actionName = action === 'create' ? 'Добавить' : action === 'update' ? 'Обновить' : action ==='delete' ? 'Удалить' : 'Поменять местами';
    const actionNameSuccess = action === 'create' ? 'добавлен' : action === 'update' ? 'обновлен' : action === 'delete' ? 'удален' : 'поменяны';

    useEffect(() => {
        setProductGroup(initialStateProductGroup)
        setSelectedWidget(0)
    }, [open])

    return (
        <div data-actions>
            <OpenModal title={actionName + ` раздел${action === 'swap' ? 'ы' : ''} продукции`} iconSrc={plus.src} openGlobal={open} setOpenGlobal={setOpen} >
                <div className={classes.form}>
                    <Timeline 
                        selectedWidget={selectedWidget}
                        setSelectedWidget={setSelectedWidget}
                        isLoading={isLoading}
                        widgets={
                                action==='swap'
                                    ?
                                [
                                    <Swap 
                                        isLoading={isLoading}
                                        setIsLoading={setIsLoading}
                                        selectedWidget={selectedWidget}
                                        setSelectedWidget={setSelectedWidget}
                                    />,
                                    <div className={classes.successAction}>
                                        <SuccessAction title={`Разделы продукции успешно ${actionNameSuccess}`} />
                                    </div>
                                ]
                                    :
                                [
                                    ...chooseWidgets(action, 
                                        <SearchAndSelection 
                                            isLoading={isLoading}
                                            setIsLoading={setIsLoading}
                                            setProductGroup={setProductGroup}
                                            selectedWidget={selectedWidget}
                                            setSelectedWidget={setSelectedWidget}
                                        />,
                                        <ChangingProductGroupAndSendData 
                                            title={actionName + ' раздел продукции'}
                                            productGroup={productGroup}
                                            setProductGroup={setProductGroup}
                                            action={action}
                                            isLoading={isLoading}
                                            setIsLoading={setIsLoading}
                                            selectedWidget={selectedWidget}
                                            setSelectedWidget={setSelectedWidget}
                                        />,
                                        <Delete 
                                            productGroup={productGroup}
                                            selectedWidget={selectedWidget}
                                            setSelectedWidget={setSelectedWidget}
                                            isLoading={isLoading}
                                            setIsLoading={setIsLoading}
                                        />
                                    ),
                                    <div className={classes.successAction}>
                                        <SuccessAction title={`Раздел продукции успешно ${actionNameSuccess}`} />
                                    </div>
                                ] 
                        } 
                    />
                </div>
            </OpenModal>
        </div>
    )
}