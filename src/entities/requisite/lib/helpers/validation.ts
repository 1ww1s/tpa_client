import { ICompanyCard, IRequisite } from "../../model/types";


export const validationRequisite = (requisite: IRequisite, setError: (error: string) => void) => {
    let isOk = true;
    if(!requisite.name) isOk = false
    if(!requisite.value) isOk = false
    if(!isOk) 
        setError('Заполните обязательные поля')
    return isOk
}

export const validationCompanyCard = (companyCard: ICompanyCard, setError: (error: string) => void) => {
    let isOk = true;
    if(!companyCard.name) isOk = false
    if(!companyCard.blobUrl && !companyCard.url) isOk = false
    if(!isOk) 
        setError('Заполните обязательные поля')
    return isOk
}