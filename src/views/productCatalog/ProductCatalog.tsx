import classes from './productCatalog.module.scss'
import ProductCatalogCards from "@/src/widgets/productCatalogCards";
import { PageTitle } from "@/src/widgets/pageTitle";
import { Suspense } from 'react';
import { LoaderDiv } from '@/src/shared/components/loaderDiv/LoaderDiv';
import { ProductPreviewLayout } from '@/src/entities/product';
import { LatestDevelopments } from '@/src/widgets/latestDevelopments';

export default async function ProductCatalog() {

    return (
        <>
            <PageTitle title="КАТАЛОГ ПРОДУКЦИИ" image='Панель управления' />
            <div className={classes.productCatalog}>
                <div className="wrapper">
                    <div className={classes.content}>
                        <div className={classes.productCatalog}>
                            <Suspense fallback={<ProductPreviewLayout loaderDiv={<LoaderDiv />} numb={4}/>}>
                                <ProductCatalogCards />                   
                            </Suspense>
                        </div>
                        <div className={classes.rightBar}>
                            <Suspense fallback={<LoaderDiv height={466} />}>
                                <div className={classes.latestDevelopments}>
                                    <LatestDevelopments />
                                </div>
                            </Suspense>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}