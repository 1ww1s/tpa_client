"use client"

import { OpenModal } from "@/src/features/openModal";
import { FC, useEffect, useState } from "react";
import plus from '@/src/shared/lib/assets/plus-square.png'
import classes from './certificateAction.module.scss'
import { chooseWidgets, Timeline } from "@/src/features/timeline";
import { SearchAndSelection } from "../searchAndSelection/SearchAndSelection";
import { Delete } from "../delete/Delete";
import { SuccessAction } from "@/src/shared/components/successAction/SuccessAction";
import { IInformationDisclosure } from "@/src/entities/informationDisclosure";
import { ChangingAndSendData } from "../changingAndSendData/ChangingAndSendData";

interface Props {
    action: 'create' | 'update' | 'delete'
}

export const InformationDisclosureAction: FC<Props> = ({action}) => {
    const initial: IInformationDisclosure = {
        name: '',
        files: []
    }
    const [informationDisclosure, setInformationDisclosure] = useState<IInformationDisclosure>(initial)
    const [selectedWidget, setSelectedWidget] = useState<number>(0)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [open, setOpen] = useState<boolean>(false)

    const actionName = action === 'create' ? 'Добавить' : action === 'update' ? 'Обновить' : 'Удалить';
    const actionNameSuccess = action === 'create' ? 'добавлен' : action === 'update' ? 'обновлен' : 'удален';

    useEffect(() => {
        setInformationDisclosure(initial)
        setSelectedWidget(0)
    }, [open])

    useEffect(() => {
        if(selectedWidget === 0){
            setInformationDisclosure(initial)
        }
    }, [selectedWidget])

    return (
        <div data-actions>
            <OpenModal title={actionName + ' раздел раскрытия информации'} iconSrc={plus.src} openGlobal={open} setOpenGlobal={setOpen} >
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
                                    setInformationDisclosure={setInformationDisclosure}
                                    selectedWidget={selectedWidget}
                                    setSelectedWidget={setSelectedWidget}
                                />,
                                <ChangingAndSendData 
                                    title={actionName + ' раздел раскрытия информации'}
                                    informationDisclosure={informationDisclosure}
                                    setInformationDisclosure={setInformationDisclosure}
                                    action={action}
                                    isLoading={isLoading}
                                    setIsLoading={setIsLoading}
                                    selectedWidget={selectedWidget}
                                    setSelectedWidget={setSelectedWidget}
                                />,
                                <Delete 
                                    informationDisclosure={informationDisclosure}
                                    selectedWidget={selectedWidget}
                                    setSelectedWidget={setSelectedWidget}
                                    isLoading={isLoading}
                                    setIsLoading={setIsLoading}
                                />
                            ),
                                <div className={classes.successAction}>
                                    <SuccessAction title={`Раздел раскрытия информации успешно ${actionNameSuccess}`} />
                                </div>
                            ] 
                        } 
                    />
                </div>
            </OpenModal>
        </div>
    )
}