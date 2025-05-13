import { IProduct } from "../../model/types";


export const validationProduct = (product: IProduct, setError: (error: string) => void): boolean => {
    let isOk = true;
    if(!product.groupSlug) isOk = false
    if(!product.name) isOk = false
    if(!product.info) isOk = false
    if(!product.images.length) isOk = false
    if(!isOk) 
        setError('Заполните обязательные поля')
    return isOk
}