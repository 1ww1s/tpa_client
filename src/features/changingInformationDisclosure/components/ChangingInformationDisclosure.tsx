import classes from './changingInformationDisclosure.module.scss'
import { MyInput } from "@/src/shared/components/myInput/MyInput";
import { IInformationDisclosure } from "@/src/entities/informationDisclosure";
import React, { FC, PropsWithChildren } from 'react';

interface Props {
    informationDisclosure: IInformationDisclosure;
    setInformationDisclosure: (informationDisclosure: IInformationDisclosure) => void;
    uploadFile: React.ReactElement;
}

export const ChangingInformationDisclosure: FC<Props & PropsWithChildren> = ({informationDisclosure, setInformationDisclosure, uploadFile, children}) => {

    const setName = (name: string) => {
        setInformationDisclosure({...informationDisclosure, name})
    }

    return (
        <div className={classes.changingInformationDisclosure}>
            <p data-title="title">Введите название раскрытия информации</p>
            <MyInput 
                value={informationDisclosure.name} 
                setValue={setName} 
                type='text' 
                placeholder='Бухгалтерская отчетность' 
                required
            />
            <p data-title="title">Файлы</p>
            <div className={classes.files}>
                {children}
            </div>
            <p data-title="title">Добавьте файл (в начало)</p>
            {uploadFile}
        </div>
    )
}