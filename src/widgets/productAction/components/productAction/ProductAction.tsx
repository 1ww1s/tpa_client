"use client"

import { OpenModal } from "@/src/features/openModal";
import { FC, useEffect, useState } from "react";
import plus from '@/src/shared/lib/assets/plus-square.png'
import classes from './productAction.module.scss'
import { chooseWidgets, Timeline } from "@/src/features/timeline";
import { initialStateProduct, initialStateProductPreview, IProduct, IProductPreview } from "@/src/entities/product";
import { SearchAndSelection } from "../searchAndSelection/SearchAndSelection";
import { Delete } from "../delete/Delete";
import { SuccessAction } from "@/src/shared/components/successAction/SuccessAction";
import { ChangingProductAndSendData } from "../changingProductAndSendData/ChangingProductAndSendData";
import { Swap } from "../swap/Swap";

interface ProductActionsProps {
    action: 'create' | 'update' | 'delete' | 'swap'
    isBasic?: boolean;
}

export const ProductAction: FC<ProductActionsProps> = ({isBasic = false, action}) => {
    const [productPreview, setProductPreview] = useState<IProductPreview>(initialStateProductPreview)
    const [product, setProduct] = useState<IProduct>(initialStateProduct)
    const [selectedWidget, setSelectedWidget] = useState<number>(0)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [open, setOpen] = useState<boolean>(false)

    const actionName = action === 'create' ? 'Добавить' : action === 'update' ? isBasic ? 'Обновить' : 'Обновить дополнительную информацию' : action === 'delete' ? 'Удалить' : 'Поменять местами';
    const actionNameSuccess = action === 'create' ? 'добавлен' : action === 'update' ? 'обновлен' : action === 'delete' ? 'удален' : 'поменяны';

    useEffect(() => {
        setProductPreview(initialStateProductPreview)
        setProduct(initialStateProduct)
        setSelectedWidget(0)
    }, [open])

    return (
        <div data-actions>
            <OpenModal title={actionName + `${action === 'update' && !isBasic ? '' : ` продукт${action === 'swap' ? 'ы' : ''}`}`} iconSrc={plus.src} openGlobal={open} setOpenGlobal={setOpen} >
                <div className={classes.form}>
                    <Timeline 
                        selectedWidget={selectedWidget}
                        setSelectedWidget={setSelectedWidget}
                        isLoading={isLoading}
                        widgets={
                            action === 'swap'
                                ?
                            [
                                <Swap isLoading={isLoading} setIsLoading={setIsLoading} selectedWidget={selectedWidget} setSelectedWidget={setSelectedWidget} />,
                                <div className={classes.successAction}>
                                    <SuccessAction title={`Продукты успешно ${actionNameSuccess}`} />
                                </div>
                            ]
                                :

                            [
                                ...chooseWidgets(action, 
                                    <SearchAndSelection 
                                        isBasic={isBasic}
                                        action={action}
                                        setProduct={setProduct}
                                        selectedWidget={selectedWidget}
                                        setProductPreview={setProductPreview}
                                        setSelectedWidget={setSelectedWidget}
                                        isLoading={isLoading}
                                        setIsLoading={setIsLoading}
                                    />,
                                    <ChangingProductAndSendData 
                                        title={actionName + `${action === 'update' && !isBasic ? '' : ` продукт`}`}
                                        product={product}
                                        setProduct={setProduct}
                                        action={action}
                                        isBasic={isBasic}
                                        isLoading={isLoading}
                                        setIsLoading={setIsLoading}
                                        selectedWidget={selectedWidget}
                                        setSelectedWidget={setSelectedWidget}
                                    />,
                                    <Delete 
                                        productPreview={productPreview}
                                        selectedWidget={selectedWidget}
                                        setSelectedWidget={setSelectedWidget}
                                        isLoading={isLoading}
                                        setIsLoading={setIsLoading}
                                    />
                                ),
                                    <div className={classes.successAction}>
                                        <SuccessAction title={`Продукт успешно ${actionNameSuccess}`} />
                                    </div>
                                ] 
                        } 
                    />
                </div>
            </OpenModal>
        </div>
    )
}