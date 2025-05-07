import { FC } from "react";
import { IProduct } from "../../model/types";
import { transformation } from "../../lib/helpers/transformation";
import classes from './productFunctions.module.scss'

interface ProductFunctionsProps {
    functions: IProduct['functions']
}

export const ProductFunctions: FC<ProductFunctionsProps> = ({functions}) => {

    return (
        <div className={classes.ProductFunctions}>
            <h2>Функции</h2>
            <div
                className={classes.list} 
                dangerouslySetInnerHTML={transformation(functions)}
            />
        </div>
    )
}