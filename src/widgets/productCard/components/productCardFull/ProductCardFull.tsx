import { FC, Suspense } from "react";
import classes from './productCardFull.module.scss'
import ProductImages from "../productImages/ProductImages";
import ProductCardData from "../ProductCardData/ProductCardData";
import { LoaderDiv } from "@/src/shared/components/loaderDiv/LoaderDiv";

interface ProductCardFullProps {
    slug: string;
}

export const ProductCardFull: FC<ProductCardFullProps> = async ({slug}) => {

    return (
        <div className={classes.productCardFull}>
            <Suspense fallback={<LoaderDiv height={460} />}>
                <ProductImages slug={slug} />
            </Suspense>
            <div className={classes.productCard}>
                
            </div>
            <Suspense fallback={<LoaderDiv height={600} />}>
                <ProductCardData slug={slug} />
            </Suspense>
        </div>
    )
}