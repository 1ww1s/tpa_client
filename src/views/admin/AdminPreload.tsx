"use client"


import { initialStateUser, IUser, userService, useUserAcions } from "@/src/entities/user";
import { LoadingScreen } from "@/src/shared/components/loadingScreen/LoadingScreen";
import { FC, useEffect, useState } from "react";
import Admin from "./Admin";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/src/shared/lib/hooks/redux";



export const AdminPreload: FC = () => {

    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [access, setAccess] = useState<boolean>(false)
    const {setUser} = useUserAcions()
    const router = useRouter()

    const validation = (user: IUser, requiredRoles: string[]): boolean => {
        let isOk = false;        
        user.roles.map(role => {
            if(requiredRoles.includes(role)) isOk = true;
        })
        return isOk
    }

    const getUser = async () => {
        try{
            setIsLoading(true)
            const userData = await userService.check()
            if(validation(userData, ['admin', 'moderator'])){
                setAccess(true)
                setUser(userData)
            }
            else{
                router.push('/')
            }
        }
        catch(e){
            router.push('/login')
        }
        finally{
            setIsLoading(false)
        }
    }

    useEffect(() => {
        getUser()
    }, [])

    return (
        <div>
            {
                isLoading
                    ?
                <LoadingScreen />
                    :
                access
                    ?
                <Admin />
                    :
                <LoadingScreen />
            }
        </div>
    )
}