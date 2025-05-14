"use client"

import { OpenModal } from "@/src/features/openModal";
import { FC, useEffect, useState } from "react";
import plus from '@/src/shared/lib/assets/plus-square.png'
import classes from './action.module.scss'
import { Timeline } from "@/src/features/timeline";
import { SuccessAction } from "@/src/shared/components/successAction/SuccessAction";
import { ChangingAndSendData } from "../changingAndSendData/ChangingAndSendData";
import { Download } from "../download/Download";
import { ICompanyCard } from "@/src/entities/requisite";


export const Action: FC = () => {

    const initial: ICompanyCard = {name: 'Карточка предприятия'}
    
    const [companyCard, setCompanyCard] = useState<ICompanyCard>(initial)
    const [selectedWidget, setSelectedWidget] = useState<number>(0)
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [open, setOpen] = useState<boolean>(false)

    useEffect(() => {
        setCompanyCard(initial)
        setSelectedWidget(0)
    }, [open])

    useEffect(() => {
        if(selectedWidget === 0){
            setCompanyCard(initial)
        }
    }, [selectedWidget])

    return (
        <div data-actions>
            <OpenModal title={'Обновить карточку предприятия'} iconSrc={plus.src} openGlobal={open} setOpenGlobal={setOpen} >
                <div className={classes.form}>
                    <Timeline 
                        selectedWidget={selectedWidget}
                        setSelectedWidget={setSelectedWidget}
                        isLoading={isLoading}
                        widgets={
                            [
                                <Download
                                    selectedWidget={selectedWidget}
                                    setCompanyCard={setCompanyCard}
                                    setIsLoading={setIsLoading}
                                    setSelectedWidget={setSelectedWidget}
                                />,
                                <ChangingAndSendData 
                                    selectedWidget={selectedWidget}
                                    companyCard={companyCard}
                                    setCompanyCard={setCompanyCard}
                                    setIsLoading={setIsLoading}
                                    setSelectedWidget={setSelectedWidget}
                                    isLoading={isLoading}
                                />,
                                <div className={classes.successAction}>
                                    <SuccessAction title={`Карточка предприятия успешно обновлена`} />
                                </div>
                            ] 
                        } 
                    />
                </div>
            </OpenModal>
        </div>
    )
}