import { IProduct } from "../../model/types";

type T = string | number

type Q = IProduct['deliverySet']

export const getRows = (obj: Q): (string | number)[][] => {
    const rows: T[][] = [];
    obj.map(o => {
        const row: T[] = [];
        for(let key in o){
            if(key !== 'id')
            row.push(o[key as keyof typeof o])
        }
    rows.push(row)
    })
    return rows
}