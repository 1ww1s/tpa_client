import { ILatestDevelopment } from "../../model/types";

export const validationLatestDevelopment = (latestDevelopment: ILatestDevelopment, setError: (error: string) => void): boolean => {
    let isOk = true;
    if(!latestDevelopment.title) isOk = false
    if(!latestDevelopment.link) isOk = false
    if(!latestDevelopment.img.value && !latestDevelopment.img.url) isOk = false
    if(!isOk) 
        setError('Заполните обязательные поля')
    return isOk
}