"use client"

import { FC, useState } from "react";
import classes from './sendDetailedData.module.scss'
import { MyButton } from "@/src/shared/components/myButtonAdmin/MyButtonAdmin";
import { AxiosError } from "axios";

interface SendDetailedDataProps {
    validation?: (setError: (error: string) => void) => boolean;
    sendData: () => Promise<string>;
    action: 'create' | 'update' | 'delete';
    onEnd?: () => void;
    isLoading: boolean;
    setIsLoading: (val: boolean) => void;
}

export const SendDetailedData: FC<SendDetailedDataProps> = ({validation, sendData, action, onEnd, isLoading, setIsLoading}) => {

    const [error, setError] = useState<string>('')

    const setErrorTime = (error: string, time: number) => {
        setError(error)
        setTimeout(() => setError(''), time)
    }

    const send = async () => {
        if(validation && !validation((error) => setErrorTime(error, 3000))) return
        try{  
            setIsLoading(true)
            await sendData()
            onEnd && onEnd()
        }
        catch(e){
            if(e instanceof Error)
                setErrorTime(e.message, 4000)
            if(e instanceof AxiosError)
                setErrorTime(e.response?.data.message, 4000)
        }   
        finally{
            setIsLoading(false)
        }
    }

    return (
        <div>
            <div className={classes.send}>
                <MyButton 
                    disabled={isLoading || Boolean(error)} 
                    isLoading={isLoading} 
                    onClick={() => send()}
                >
                    {action === 'create' ? 'Добавить' : action === 'update' ? 'Обновить' : 'Удалить'}
                </MyButton>
            </div>
            <div className={classes.error}>{(error) && <span>*{error}</span>}</div>
        </div>
    )
}