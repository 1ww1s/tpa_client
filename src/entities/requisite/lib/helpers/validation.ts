import { IRequisite } from "../../model/types";


export const validationRequisite = (requisite: IRequisite, setError: (error: string) => void) => {
    let isOk = true;
    if(!requisite.name) isOk = false
    if(!requisite.value) isOk = false
    if(!isOk) 
        setError('Заполните обязательные поля')
    return isOk
}