import classes from './productGroup.module.scss'
import ProductGroupCards from "@/src/widgets/productGroupCards";
import { PageTitle } from '@/src/widgets/pageTitle';
import { Suspense } from 'react';
import {LatestDevelopments} from '@/src/widgets/latestDevelopments';
import { LoaderDiv } from '@/src/shared/components/loaderDiv/LoaderDiv';
import { ProductPreviewLayout } from '@/src/entities/product';
import { IProductGroupItem, productGroupService } from '@/src/entities/productGroup';
import { isDynamicServerError } from 'next/dist/client/components/hooks-server-context';
import { NotFound } from '@/src/widgets/not-found';

interface ProductProps {    
    slug: string;
}

const getData = async (slug: string) => {
    let productGroupItem: IProductGroupItem | null = null;
    try{
        productGroupItem = await productGroupService.fetchNameBySlug(slug)
    }
    catch(e){
        if (isDynamicServerError(e)) {
            throw e;
        }
        console.log(e)
    }
    return productGroupItem
}

export default async function ProductGroup({slug}: ProductProps) {

    const productGroupItem = await getData(slug)

    if(!productGroupItem) return <NotFound />

    return (
        <>
            <PageTitle title={productGroupItem.name} image='Панель управления' />
            <div className={classes.productGroup}>
                <div className="wrapper">
                    <div className={classes.content}>
                        <div className={classes.productPreview}>
                            {/* <Suspense fallback={<ProductPreviewLayout loaderDiv={<LoaderDiv />} numb={4}/>}> */}
                                <ProductGroupCards slug={slug} />
                            {/* </Suspense> */}
                        </div>
                        <div className={classes.rightBar}>
                            {/* <Suspense fallback={<LoaderDiv height={466} />}> */}
                                <LatestDevelopments />
                            {/* </Suspense> */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}