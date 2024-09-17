import { FC } from "react";
import classes from './productTechCharacteristics.module.scss'
import { IProduct } from "../../model/types";
import { MyTableDashed } from "@/src/shared/components/myTableDashed/MyTableDashed";

interface ProductTechCharacteristicsProps {
    techCharacteristics: IProduct['techCharacteristics']
}

export const ProductTechCharacteristics: FC<ProductTechCharacteristicsProps> = ({techCharacteristics}) => {

    const getRowTh = (): string[] => { 
        const row: string[] = [];
        techCharacteristics.items.map(t => {
            row.push(t.name)
        })
        return row; 
    }

    const getRowTd = (obj: {id: number, value: string}[]): string[] => {
        const row: string[] = [];
        obj.map(o => {
            row.push(o.value)
        })
        return row;
    }

    const getRows = (): string[][] => {
        const rows: string[][] = [[]];
    
        techCharacteristics.data.map(tc => {
            const row: string[] = [];
            row.push(tc.name, tc.unit)
            row.push(...getRowTd(tc.value))
            rows.push(row)
        })  

        return rows;
    }

    const columns = ['Наименование', 'Ед. изм.', ...getRowTh()]

    return (
        <div className={classes.ProductTechCharacteristics}>
            <h2>Технические характеристики</h2>
            <MyTableDashed columns={columns} rows={getRows()} />
        </div>
    )
}


