import { IPartner } from "../../model/types";


export const validationPartner = (partner: IPartner, setError: (error: string) => void) => {
    let isOk = true;
    if(!partner.name) isOk = false
    if(!partner.img?.value) isOk = false
    if(!isOk) 
        setError('Заполните обязательные поля')
    return isOk
}