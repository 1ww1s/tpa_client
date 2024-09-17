"use client"

import { FC, FormEvent, useState } from "react";
import classes from './formAuth.module.scss'
import { MyInput } from "@/src/shared/components/myInput/MyInput";
import { userService, useUserAcions } from "@/src/entities/user";
import { useAppSelector } from "@/src/shared/lib/hooks/redux";
import { usePathname, useRouter } from "next/navigation";
import { MyButton } from "@/src/shared/components/myButtonAdmin/MyButtonAdmin";
import { AxiosError } from "axios";
import Link from "next/link";


export const FormAuth: FC = () => {

    const {setEmail, setUser, setIsAuth} = useUserAcions()
    const {user} = useAppSelector(state => state.UserReducer)
    const [password, setPassword] = useState<string>('')
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<string>('')

    const setErrorTime = (error: string, time: number) => {
        setError(error)
        setTimeout(() => setError(''), time)
    }

    const pathname = usePathname()
    const router = useRouter()
    const isLogin = pathname === '/login'

    const submit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            setIsLoading(true)
            console.log(user.email)
            let res;
            if(isLogin){
                res = await userService.login(user.email, password)
                
            }
            else{
                res = await userService.registration(user.email, password)
            }
            
            setUser(res.user)
            setIsAuth(true)
            router.push(process.env.NEXT_PUBLIC_CLIENT_URL + '/admin')
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
        <form onSubmit={submit} className={classes.formAuth}>
            <h1> {isLogin ? 'Войти' : 'Зарегистрироваться'}</h1>
            <div className={classes.input}>
                <MyInput value={user.email} autoComplete='off' setValue={setEmail} placeholder="Email..." type="email" />
            </div>
            <div className={classes.input}>
                <MyInput value={password} autoComplete='none' setValue={setPassword} placeholder="Пароль..." type="password" />
            </div>
            <MyButton
                error={error}
                isLoading={isLoading}
            >
                {isLogin ? 'Войти' : 'Зарегистрироваться'}
            </MyButton>
            <span className={classes.sign}>
                <Link 
                    href={process.env.NEXT_PUBLIC_CLIENT_URL + (isLogin ? '/registration' : '/login')}
                >
                    {isLogin ? 'Зарегистрироваться' : 'Войти'}
                </Link>
            </span>
        </form>
    )
}