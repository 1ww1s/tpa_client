import { ICertificate } from "../../model/types";


export const validationCertificate = (certificate: ICertificate, setError: (error: string) => void) => {
    let isOk = true;
    if(!certificate.name) isOk = false
    if(!certificate.img?.value) isOk = false
    if(!certificate.endDate) isOk = false
    if(!isOk) 
        setError('Заполните обязательные поля')
    return isOk
}