import { IProduct, ProductCard, productService } from "@/src/entities/product";
import { isDynamicServerError } from "next/dist/client/components/hooks-server-context";

const getData = async (slug: string) =>  {
    let productData: IProduct | null = null;
    try{
        productData = await productService.fetchProduct(slug)
    }
    catch(e){
        if (isDynamicServerError(e)) {
            throw e;
        }
        console.log(e)
    }
    return productData
}

interface ProductCardDataProps{
    slug: string;
}

export default async function ProductCardData({slug}: ProductCardDataProps) {

    const product = await getData(slug)

    if(!product) return <></>

    return (
        <ProductCard product={product} />
    )
}