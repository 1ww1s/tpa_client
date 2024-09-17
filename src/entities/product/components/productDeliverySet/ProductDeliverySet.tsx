import { FC } from "react";
import { IProduct } from "../../model/types";
import { MyTable } from "@/src/shared/components/myTable/MyTable";
import { getRows } from "../../lib/helpers/getRows";
import { MyTableDashed } from "@/src/shared/components/myTableDashed/MyTableDashed";

interface ProductDeliverySetProps {
    deliverySet: IProduct['deliverySet'];
}

const columns = ['Наименование', 'Кол-во', 'Примечание'];

export const ProductDeliverySet: FC<ProductDeliverySetProps> = ({deliverySet}) => {

    type T = string | number
    const rows: T[][] = getRows(deliverySet)

    return (
        <div>
            <h2>Комплект поставки</h2>
            <MyTableDashed columns={columns} rows={rows} />
        </div>
    )
}