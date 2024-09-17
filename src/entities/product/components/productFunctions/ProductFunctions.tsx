import { FC } from "react";
import { IProduct } from "../../model/types";
import { Marked } from "@ts-stack/markdown";
import { transformation } from "../../lib/helpers/transformation";
import classes from './productFunctions.module.scss'

interface ProductFunctionsProps {
    functions: IProduct['functions']
}

export const ProductFunctions: FC<ProductFunctionsProps> = ({functions}) => {

    return (
        <div className={classes.ProductFunctions}>
            <h2>Функции</h2>
            <div dangerouslySetInnerHTML={transformation(functions)}></div>
        </div>
    )
}