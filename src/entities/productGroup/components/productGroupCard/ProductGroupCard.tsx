"use client"

import { FC, PropsWithChildren, useEffect, useRef } from "react";
import { IProductGroup } from "../../model/types";
import classes from './productGroupCard.module.scss'
import Image from "next/image";

interface ProductGroupCardProps {
    productGroup: IProductGroup;
}

export const ProductGroupCard: FC<ProductGroupCardProps & PropsWithChildren> = ({productGroup, children}) => {

    return (
        <div className={classes.productGroupCardWrapper}>
            <div className={classes.productGroupCard}>
                <div className={classes.image}>
                    <Image src={productGroup.img.value} width={400} height={400} alt={productGroup.img.name} />
                </div>
                <div className={classes.title}>
                    <span>{productGroup.title}</span>
                </div>
                <div className={classes.link}>
                    {children}
                </div>

            </div>
        </div>
    )
}