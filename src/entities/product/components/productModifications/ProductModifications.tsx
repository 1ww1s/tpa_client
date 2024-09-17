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

    const rows: (string | number)[][] = getRows(modifications)

    return (
        <>
        <div className={classes.ProductFunctions}>
            <h2>Модификации</h2>
            <MyTableDashed columns={columns} rows={rows} />
        </div>
        </>
    )
}