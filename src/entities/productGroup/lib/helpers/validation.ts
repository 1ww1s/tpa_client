import { IProductGroup } from "../../model/types";


export const validationProductGroup = (productGroup: IProductGroup, setError: (error: string) => void): boolean => {
    let isOk = true;
    if(!productGroup.title) isOk = false
    if(!productGroup.info) isOk = false
    if(!productGroup.img?.file && !productGroup.img?.url) isOk = false
    if(!isOk) 
        setError('Заполните обязательные поля')
    return isOk
}