import { FC } from "react";
import classes from './productModifications.module.scss'
import { MyTable } from "@/src/shared/components/myTable/MyTable";
import { IProduct } from "../../model/types";
import { getRows } from "../../lib/helpers/getRows";
import { MyTableDashed } from "@/src/shared/components/myTableDashed/MyTableDashed";

interface ProductModificationsProps {
    modifications: IProduct['modifications'];
}

const columns = ['Обозначение', 'Дизель', 'Примечание'];

export const ProductModifications: FC<ProductModificationsProps> = ({modifications}) => {

    const getRowTh = (): string[] => { 
        const row: string[] = [];
        modifications.items.map(t => {
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
    
        modifications.data.map(tc => {
            const row: string[] = [];
            row.push(tc.name,)
            row.push(...getRowTd(tc.value))
            rows.push(row)
        })  

        return rows;
    }

    const columns = ['Обозначение', ...getRowTh()]

    return (
        <div className={classes.ProductTechCharacteristics}>
            <h2>Модификации</h2>
            <MyTableDashed 
                columns={columns} 
                rows={getRows()} 
            />
        </div>
    )
}

