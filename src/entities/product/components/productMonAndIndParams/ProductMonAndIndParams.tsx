import { FC } from "react";
import { IProduct } from "../../model/types";
import { transformation } from "../../lib/helpers/transformation";
import classes from './productMonAndIndParams.module.scss'

interface ProductMonAndIndParamsProps {
    monAndIndParams: IProduct['monAndIndParams']
}


export const ProductMonAndIndParams: FC<ProductMonAndIndParamsProps> = ({monAndIndParams}) => {
    return (
        <div className={classes.ProductMonAndIndParams}>
            <h2>Контроль и индикация параметров</h2>
            <div dangerouslySetInnerHTML={transformation(monAndIndParams)}></div>
        </div>
    )
}