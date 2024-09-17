import { IUnit } from "../../model/types";


export const validationUnit = (unit: IUnit, setError: (error: string) => void): boolean => {
    let isOk = true;
    if(!unit.value) isOk = false;
    if(!isOk) 
        setError('Заполните обязательные поля')
    return isOk
}