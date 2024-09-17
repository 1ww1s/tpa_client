import { IPartner, usePartnerActions } from "@/src/entities/partner";
import { FC } from "react";
import classes from './changingPartner.module.scss'
import { MyInput } from "@/src/shared/components/myInput/MyInput";

interface ChangingPartnerProps {
    partner: IPartner;
    setPartner: (partner: IPartner) => void;
    uploadImage: React.ReactElement;
}

export const ChangingPartner: FC<ChangingPartnerProps> = ({partner, setPartner, uploadImage}) => {
    
    const {setName} = usePartnerActions(partner, setPartner)

    return (
        <div className={classes.changingPartner}>
            <p data-title="title">Введите название партнера</p>
            <MyInput 
                value={partner.name} 
                setValue={setName} 
                type='text' 
                placeholder='Костромской судомеханический завод' 
                required
            />
            <p data-title="title">Фотография</p>
            {uploadImage}
        </div>
    )
}