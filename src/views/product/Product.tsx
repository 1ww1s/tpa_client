import { IProductItem, productService } from "@/src/entities/product";
import React, { FC, Suspense } from "react";
import classes from './product.module.scss'
import ProductCardFull from "@/src/widgets/productCard";
import { PageTitle } from "@/src/widgets/pageTitle";
import { LoaderDiv } from "@/src/shared/components/loaderDiv/LoaderDiv";
import {LatestDevelopments} from "@/src/widgets/latestDevelopments";
import { NotFound } from "@/src/widgets/not-found";
import { isDynamicServerError } from "next/dist/client/components/hooks-server-context";


interface ProductProps {    
    slug: string;
}

const getData = async (slug: string) => {
    let productItem: IProductItem | null = null;
    try{
        productItem = await productService.fetchNameBySlug(slug) 
    }
    catch(e){
        if (isDynamicServerError(e)) {
            throw e;
        }
        console.log(e)
    }
    return productItem
}

export default async function Product({slug}: ProductProps) {
    
    const productItem = await getData(slug)

    if(!productItem) return <NotFound />

    return (
        <>
            <PageTitle title={productItem.name} image='Панель управления' />
            <div className={classes.product}>
                <div className="wrapper">
                    <div className={classes.content}>
                        <div className={classes.productCard}>
                            <ProductCardFull slug={slug} />
                        </div>
                        <div className={classes.rightBar}>
                            {/* <Suspense fallback={<LoaderDiv height={466} />}> */}
                                <div className={classes.latestDevelopments}>
                                    <LatestDevelopments />
                                </div>
                            {/* </Suspense> */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}