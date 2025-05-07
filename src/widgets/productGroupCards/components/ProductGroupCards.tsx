import { IProductPreview, ProductPreview, productService } from "@/src/entities/product";
import { ClickOnButton } from "@/src/features/clickOnButton";
import { Empty } from "@/src/shared/components/empty/Empty";
import { isDynamicServerError } from "next/dist/client/components/hooks-server-context";
import { FC } from "react";

interface ProductGroupCardsProps {
    slug: string;
}

const getData = async (slug: string): Promise<IProductPreview[]> => {
    let productsPreview: IProductPreview[] = [];
    try{
        productsPreview = await productService.fetchPreviews(slug)
    }
    catch(e){
        if (isDynamicServerError(e)) {
            throw e;
        }
        console.log(e)
    }
    return productsPreview
}

export const ProductGroupCards: FC<ProductGroupCardsProps> = async ({slug}) => {

    const productsPreview = await getData(slug)
    if(!productsPreview.length) return <Empty />

    return (
        <div>
            {productsPreview.map(p => 
                <ProductPreview key={p.title} title={p.title} info={p.info} img={p.img} observed >
                    <ClickOnButton title="Подробнее..." link={process.env.NEXT_PUBLIC_CLIENT_URL + `/product-catalog/${p.slug}`} />
                </ProductPreview>
            )}
        </div>
    )
}