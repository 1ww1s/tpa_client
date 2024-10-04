"use client"

import React, { FC, useState } from "react";
import classes from './admin.module.scss'
import { ProductAction } from "@/src/widgets/productAction";
import { CertificateAction } from "@/src/widgets/certificateAction/components/certificateAction/CertificateAction";
import { ProductGroupAction } from "@/src/widgets/productGroupAction";
import { UnitAction } from "@/src/widgets/unitAction";
import { PartnerAction } from "@/src/widgets/partnerAction";
import { userService, useUserAcions } from "@/src/entities/user";
import { useAppSelector } from "@/src/shared/lib/hooks/redux";
import { AddUser } from "@/src/widgets/addUser";
import { MyButton } from "@/src/shared/components/myButtonAdmin/MyButtonAdmin";
import { setErrorTime } from "@/src/shared/lib/helpers/setErrorTime";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { RequisiteAction } from "@/src/widgets/requisiteAction";
import { LatestDevelopmentsAction } from "@/src/widgets/latestDevelopmentsAction";
 
export const Admin: FC = () => {

    const {user} = useAppSelector(state => state.UserReducer)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<string>('')
    const router = useRouter()

    const logout = async () => {
        try{
            setIsLoading(true)
            await userService.logout()
            router.push('/login')
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

    return(
        <div className={classes.admin}>
            <div className="wrapper">
                <h1>Админ панель</h1>
                <div>
                    <h3>Продукт</h3>
                    <ProductAction action='create' />
                    <ProductAction action='update' />
                    <ProductAction action='delete' />
                    <ProductAction action='swap' />
                </div>
                <div>
                    <h3>Раздел продукции</h3>
                    <ProductGroupAction action='create' />
                    <ProductGroupAction action='update' />
                    <ProductGroupAction action='delete' />
                    <ProductGroupAction action='swap' />
                </div>
                <div>
                    <h3>Последние разработки</h3>
                    <LatestDevelopmentsAction action='create' />
                    <LatestDevelopmentsAction action='delete' />
                </div>
                <div>
                    <h3>Сертификаты</h3>
                    <CertificateAction action='create' />
                    <CertificateAction action='update' />
                    <CertificateAction action='delete' />
                </div>
                <div>
                    <h3>Реквизиты</h3>
                    <RequisiteAction action='create' />
                    <RequisiteAction action='update' />
                    <RequisiteAction action='delete' />
                </div>
                {/* <div>
                    <h3>Контакты</h3>
                    <ContactUpdate />
                </div> */}
                <div>
                    <h3>Единица измерения</h3>
                    <UnitAction action='create' />
                    <UnitAction action='update' />
                </div>
                <div>
                    <h3>Партнер</h3>
                    <PartnerAction action='create' />
                    <PartnerAction action='update' />
                    <PartnerAction action='delete' />
                </div>
                {
                    user.roles.includes('admin')
                        &&
                    <div>
                        <h3>Пользователи</h3>
                        <AddUser action='create' />
                        <AddUser action='delete' />
                    </div>
                }
                <div className={classes.logout}>
                    <hr />
                    <MyButton
                        onClick={logout}
                        isLoading={isLoading}
                        error={error}
                    >
                        Выйти
                    </MyButton>
                </div>
            </div>
        </div>
    )
}

export default Admin;