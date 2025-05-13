import { IProductItem, productService } from "@/src/entities/product";
import React, { Suspense } from "react";
import classes from './product.module.scss'
import ProductCardFull from "@/src/widgets/productCard";
import { PageTitle } from "@/src/widgets/pageTitle";
import { LoaderDiv } from "@/src/shared/components/loaderDiv/LoaderDiv";
import {LatestDevelopments} from "@/src/widgets/latestDevelopments";
import { NotFound } from "@/src/widgets/not-found";
import { isDynamicServerError } from "next/dist/client/components/hooks-server-context";
import { GroupModels } from "@/src/widgets/groupModels";
import { Breadcrumbs, IBreadcrumb } from "@/src/entities/breadcrumbs";
import { IProductGroupItem, productGroupService } from "@/src/entities/productGroup";


interface ProductProps {    
    slug: string;
    productGroupSlug: string;
}

const getData = async (slug: string, productGroupSlug: string) => {
    let productItem: IProductItem | null = null;
    let productGroup: IProductGroupItem | null = null;
    try{
        productItem = await productService.fetchNameBySlug(slug) 
        productGroup = await productGroupService.fetchNameBySlug(productGroupSlug)
    }
    catch(e){
        if (isDynamicServerError(e)) {
            throw e;
        }
        console.log(e)
    }
    return {productItem, productGroup}
}

export default async function Product({slug, productGroupSlug}: ProductProps) {
    
    const {productItem, productGroup} = await getData(slug, productGroupSlug)

    if(!productItem || !productGroup) return <NotFound />

    const breadcrumbs: IBreadcrumb[] = [
        { path: '/product-catalog', label: 'Каталог продукции' },
        { path: `/product-catalog/${productGroupSlug}`, label: productGroup.name },
        { path: `/product-catalog/${productGroupSlug}/${slug}`, label: productItem.name }
    ]

    return (
        <>
            <PageTitle title={productItem.name} image='Панель управления' />
            <div className={classes.product}>
                <div className="wrapper">
                    <Breadcrumbs breadcrumbs={breadcrumbs} />
                    <div className={classes.content}>
                        <div className={classes.productCard}>
                            <ProductCardFull slug={slug} />
                        </div>
                        <div className={classes.rightBar}>
                            <Suspense fallback={<LoaderDiv height={466} />}>
                                <div className={classes.latestDevelopments}>
                                    <LatestDevelopments />
                                </div>
                            </Suspense>
                            <div className={classes.groupModels}>
                                <Suspense fallback={<LoaderDiv height={200} />}>
                                    <GroupModels slug={slug}/>
                                </Suspense>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}