"use client"

import { initialStateRole, roleService } from "@/src/entities/role";
import { IRole } from "@/src/entities/role/model/types";
import { IUser, userService } from "@/src/entities/user";
import { SendDetailedData } from "@/src/features/sendDetailedData";
import { MyInput } from "@/src/shared/components/myInput/MyInput";
import { MySelect } from "@/src/shared/components/mySelect/MySelect";
import { setErrorTime } from "@/src/shared/lib/helpers/setErrorTime";
import { AxiosError } from "axios";
import { FC, useEffect, useState } from "react";
import classes from './changingUserAndSendData.module.scss'

interface ChangingUserProps {
    title: string;
    action: 'create' | 'delete';
    user: IUser;
    onEnd: () => void;
}

export const ChangingUser: FC<ChangingUserProps> = ({action, title, user, onEnd}) => {

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<string>('')
    const [options, setOptions] = useState<{name: string, value: string}[]>([])
    const [selectedRole, setSelectedRole] = useState<IRole>(initialStateRole)

    const getRoles = async () => {
        try{
            setIsLoading(true)
            const roles = await roleService.getAll()
            if(action === 'create'){
                setOptions(roles.filter(r => !user.roles.includes(r.value)).map(r => {return {name: r.value, value: r.value}}))
            }
            else{
                setOptions(roles.filter(r => user.roles.includes(r.value)).map(r => {return {name: r.value, value: r.value}}))
            }
        }
        catch(e){
            if(e instanceof Error)
                setErrorTime(e.message, setError, 4000)
            if(e instanceof AxiosError)
                setErrorTime(e.response?.data.message, setError, 4000)
        }
        finally{
            setIsLoading(false)
        }
    } 
    
    useEffect(() => {
        getRoles()
    }, [])

    return (
        <div className={classes.changingUser}>
            <h2>{title}</h2>
            <h3>{user.email}</h3>
            <MySelect value={selectedRole.value} options={options} defaultValue={'Выберите роль'} change={(value: string) => {setSelectedRole({...selectedRole, value})}} />
            <hr />
            <SendDetailedData 
                isLoading={isLoading}
                setIsLoading={setIsLoading}
                onEnd={onEnd}
                sendData={
                    action === 'create' 
                        ? 
                    async () => await userService.addRole(user.email, selectedRole.value) 
                        : 
                    async () => await userService.deleteRole(user.email, selectedRole.value)
                }
                action={action}
            />
        </div>
    )
}