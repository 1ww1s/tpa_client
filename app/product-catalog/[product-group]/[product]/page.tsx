import { IProductPreview, productService } from "@/src/entities/product";
import Product from "@/src/views/product/Product";
import React from "react";

type Props = {
    params: { product: string, ['product-group']: string }
}
 
export const dynamicParams = true 
 
export async function generateStaticParams() {
  
  let productItems = await productService.fetchNames()
  
  return productItems.map((item) => ({
    'product-group': item.productGroupSlug,
    'product': item.productSlug,
  }))
}

export async function generateMetadata({ params }: Props) {

    let productPrev: IProductPreview | null = null;
    try{
      productPrev = await productService.getPreview(params.product)
    }
    catch(e){}
    return {
      title: productPrev?.title || '',
      description: productPrev?.info || '',
    }
}


export default async function ProductPage (context: Props){

    const slug = context.params.product;
    const productGroup = context.params["product-group"];

    return (
      <Product slug={slug} productGroupSlug={productGroup} />
    )
}
