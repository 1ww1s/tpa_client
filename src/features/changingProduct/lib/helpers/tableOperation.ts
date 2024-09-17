import { IProduct } from "@/src/entities/product";



export const SetData = <F>(target: F[], setDataTarget: (o: F[]) => void) => {
    return function(newValue: any, field: Exclude<keyof F, "id">, ind: number){
        const data: F[] = JSON.parse(JSON.stringify(target));
        data[ind][field] = newValue;
        setDataTarget(data)
    }
}


export const AddRow = <F>(target: F[], initial: F, setDataTarget: (o: F[]) => void) => {
    return function(){
        const newRow: F[] = JSON.parse(JSON.stringify(target));
        newRow.push(initial)
        setDataTarget(newRow);
    }
}


export const RemoveRow = <F>(target: F[], setDataTarget: (o: F[]) => void) => {
    return function(i: number){
        const row: F[] = JSON.parse(JSON.stringify(target));
        row.splice(i, 1)
        setDataTarget(row)
    }
}