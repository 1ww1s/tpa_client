"use client"

import { FC, PropsWithChildren, } from "react";
import { IProductGroup } from "../../model/types";
import classes from './productGroupCard.module.scss'
import Image from "next/image";
import Link from "next/link";

interface ProductGroupCardProps {
    productGroup: IProductGroup;
}

export const ProductGroupCard: FC<ProductGroupCardProps & PropsWithChildren> = ({productGroup, children}) => {

    return (
        <div className={classes.productGroupCardWrapper}>
            <div className={classes.productGroupCard}>
                <Link href={process.env.NEXT_PUBLIC_CLIENT_URL + `/product-catalog/${productGroup.slug}`} className={classes.image}>
                    <Image 
                        src={`${process.env.NEXT_PUBLIC_SERVER_URL}${productGroup.img.url ? productGroup.img.url : ''}`} 
                        width={360} 
                        height={360} 
                        alt={productGroup.img.name} 
                    />
                </Link>
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