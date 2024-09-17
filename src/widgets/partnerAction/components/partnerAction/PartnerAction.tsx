"use client"

import { OpenModal } from "@/src/features/openModal";
import { FC, useEffect, useState } from "react";
import plus from '@/src/shared/lib/assets/plus-square.png'
import classes from './partnerAction.module.scss'
import { chooseWidgets, Timeline } from "@/src/features/timeline";
import { SearchAndSelection } from "../searchAndSelection/SearchAndSelection";
import { Delete } from "../delete/Delete";
import { SuccessAction } from "@/src/shared/components/successAction/SuccessAction";
import { ChangingPartnerAndSendData } from "../changingPartnerAndSendData/ChangingPartnerAndSendData";
import { initialStatePartner, IPartner } from "@/src/entities/partner";

interface PartnerActionProps {
    action: 'create' | 'update' | 'delete'
}

export const PartnerAction: FC<PartnerActionProps> = ({action}) => {

    const [partner, setPartner] = useState<IPartner>(initialStatePartner)
    const [selectedWidget, setSelectedWidget] = useState<number>(0)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [open, setOpen] = useState<boolean>(false)

    const actionName = action === 'create' ? 'Добавить' : action === 'update' ? 'Обновить' : 'Удалить';
    const actionNameSuccess = action === 'create' ? 'добавлен' : action === 'update' ? 'обновлен' : 'удален';

    useEffect(() => {
        setPartner(initialStatePartner)
        setSelectedWidget(0)
    }, [open])

    return (
        <div data-actions>
            <OpenModal title={actionName + ' партнера'} iconSrc={plus.src} openGlobal={open} setOpenGlobal={setOpen} >
                <div className={classes.form}>
                    <Timeline 
                        selectedWidget={selectedWidget}
                        setSelectedWidget={setSelectedWidget}
                        isLoading={isLoading}
                        widgets={
                            [...chooseWidgets(action, 
                                <SearchAndSelection 
                                    setPartner={setPartner}
                                    selectedWidget={selectedWidget}
                                    setSelectedWidget={setSelectedWidget}
                                />,
                                <ChangingPartnerAndSendData 
                                    title={actionName + ' партнера'}
                                    partner={partner}
                                    setPartner={setPartner}
                                    action={action}
                                    isLoading={isLoading}
                                    setIsLoading={setIsLoading}
                                    selectedWidget={selectedWidget}
                                    setSelectedWidget={setSelectedWidget}
                                />,
                                <Delete 
                                    partner={partner}
                                    selectedWidget={selectedWidget}
                                    setSelectedWidget={setSelectedWidget}
                                    isLoading={isLoading}
                                    setIsLoading={setIsLoading}
                                />
                            ),
                                <div className={classes.successAction}>
                                    <SuccessAction title={`Партнер успешно ${actionNameSuccess}`} />
                                </div>
                            ] 
                        } 
                    />
                </div>
            </OpenModal>
        </div>
    )
}