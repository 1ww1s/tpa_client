"use client"

import { OpenModal } from "@/src/features/openModal";
import { FC, useEffect, useState } from "react";
import plus from '@/src/shared/lib/assets/plus-square.png'
import classes from './certificateAction.module.scss'
import { chooseWidgets, Timeline } from "@/src/features/timeline";
import { SearchAndSelection } from "../searchAndSelection/SearchAndSelection";
import { Delete } from "../delete/Delete";
import { SuccessAction } from "@/src/shared/components/successAction/SuccessAction";
import { ChangingCertificateAndSendData } from "../changingCertificateAndSendData/ChangingCertificateAndSendData";
import { ICertificate, initialStateCertificate } from "@/src/entities/certificate";

interface CertificateActionProps {
    action: 'create' | 'update' | 'delete'
}

export const CertificateAction: FC<CertificateActionProps> = ({action}) => {

    const [certificate, setCertificate] = useState<ICertificate>(initialStateCertificate)
    const [selectedWidget, setSelectedWidget] = useState<number>(0)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [open, setOpen] = useState<boolean>(false)

    const actionName = action === 'create' ? 'Добавить' : action === 'update' ? 'Обновить' : 'Удалить';
    const actionNameSuccess = action === 'create' ? 'добавлен' : action === 'update' ? 'обновлен' : 'удален';

    useEffect(() => {
        setCertificate(initialStateCertificate)
        setSelectedWidget(0)
    }, [open])

    return (
        <div data-actions>
            <OpenModal title={actionName + ' сертификат'} iconSrc={plus.src} openGlobal={open} setOpenGlobal={setOpen} >
                <div className={classes.form}>
                    <Timeline 
                        selectedWidget={selectedWidget}
                        setSelectedWidget={setSelectedWidget}
                        isLoading={isLoading}
                        widgets={
                            [...chooseWidgets(action, 
                                <SearchAndSelection 
                                    setCertificate={setCertificate}
                                    selectedWidget={selectedWidget}
                                    setSelectedWidget={setSelectedWidget}
                                />,
                                <ChangingCertificateAndSendData 
                                    title={actionName + ' сертификат'}
                                    certificate={certificate}
                                    setCertificate={setCertificate}
                                    action={action}
                                    isLoading={isLoading}
                                    setIsLoading={setIsLoading}
                                    selectedWidget={selectedWidget}
                                    setSelectedWidget={setSelectedWidget}
                                />,
                                <Delete 
                                    certificate={certificate}
                                    selectedWidget={selectedWidget}
                                    setSelectedWidget={setSelectedWidget}
                                    isLoading={isLoading}
                                    setIsLoading={setIsLoading}
                                />
                            ),
                                <div className={classes.successAction}>
                                    <SuccessAction title={`Сертификат успешно ${actionNameSuccess}`} />
                                </div>
                            ] 
                        } 
                    />
                </div>
        
            </OpenModal>
        </div>
    )
}