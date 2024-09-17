"use client"

import { OpenModal } from "@/src/features/openModal";
import { FC, useEffect, useState } from "react";
import plus from '@/src/shared/lib/assets/plus-square.png'
import { Timeline } from "@/src/features/timeline";
import classes from './addUser.module.scss'
import { MyInput } from "@/src/shared/components/myInput/MyInput";
import { ChangingUser } from "./changingUserAndSendData/ChangingUser";
import { SearchAndSelection } from "./searchAndSelection/SearchAndSelection";
import { initialStateUser, IUser } from "@/src/entities/user";
import { SuccessAction } from "@/src/shared/components/successAction/SuccessAction";



interface AddUserProps {
    action: 'create' | 'delete'
}

export const AddUser: FC<AddUserProps> = ({action}) => {

    const [selectedWidget, setSelectedWidget] = useState<number>(0)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [open, setOpen] = useState<boolean>(false)
    const [user, setUser] = useState<IUser>(initialStateUser.user)

    const actionName = action === 'create' ? 'Добавить' : 'Удалить';
    const actionNameSuccess = action === 'create' ? 'добавлена' : 'удалена';

    useEffect(() => {
        setSelectedWidget(0)
    }, [open])

    return (
        <div data-actions>
            <OpenModal title={actionName + ' роль пользователю'} iconSrc={plus.src} openGlobal={open} setOpenGlobal={setOpen} >
                <div className={classes.form}>
                    <Timeline 
                        selectedWidget={selectedWidget}
                        setSelectedWidget={setSelectedWidget}
                        isLoading={isLoading}
                        widgets={
                            [
                                <SearchAndSelection selectedWidget={selectedWidget} setSelectedWidget={setSelectedWidget} setUser={setUser} />,
                                <ChangingUser title={actionName + ' роль пользователю'} action={action} user={user} onEnd={() => (setSelectedWidget(selectedWidget + 1))} />,
                                <div className={classes.successAction}>
                                    <SuccessAction title={`Роль успешно ${actionNameSuccess}`} />
                                </div>
                            ]
                        } 
                    />
                </div>
        
            </OpenModal>
        </div>
    )
}