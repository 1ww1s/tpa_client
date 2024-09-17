import { FC } from "react";
import classes from './productInfo.module.scss'
import hrImg from '@/src/shared/lib/assets/hr.png'

interface ProductInfoProps {
    info: string;
}

export const ProductInfo: FC<ProductInfoProps> = ({info}) => {
    return (
        <div className={classes.productInfo}>
            <span className={classes.info}>{info}</span>
        </div>
    )
}