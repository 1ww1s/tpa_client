import { ProductPreview } from "@/src/entities/product";
import { IProductGroup, productGroupService } from "@/src/entities/productGroup";
import { ClickOnButton } from "@/src/features/clickOnButton";
import { Empty } from "@/src/shared/components/empty/Empty";
import { isDynamicServerError } from "next/dist/client/components/hooks-server-context";
import { FC } from "react";
import classes from './productCatalogCards.module.scss'

const getData = async () =>  {
    let productGroup: IProductGroup[] = [];
    try{
        productGroup = await productGroupService.fetchGetAll()
    }
    catch(e){
        if (isDynamicServerError(e)) {
            throw e;
        }
        console.log(e)
    }
    return productGroup
}

export const ProductCatalogCards: FC = async () => {

    const productGroup = await getData()
    if(!productGroup.length) return <Empty />

    return (
        <div>
            {productGroup.map((p, ind) => 
                <div key={ind} className={classes.productPreview}>
                    <ProductPreview key={p.title} title={p.title} info={p.info} img={p.img} observed >
                        <ClickOnButton title="Подробнее..." link={process.env.NEXT_PUBLIC_CLIENT_URL + `/product-catalog/${p.slug}`} />
                    </ProductPreview>
                </div>
            )}
        </div>
    )
}