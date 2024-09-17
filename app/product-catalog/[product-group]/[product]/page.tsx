import { IProductItem, productService } from "@/src/entities/product";
import Product from "@/src/views/product/Product";
import { NextPage } from "next";
import React, { Suspense } from "react";

type Props = {
    params: { product: string }
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

    let productItem: IProductItem | null = null;
    try{
      productItem = await productService.fetchNameBySlug(params.product)
    }
    catch(e){}
    return {
      title: productItem?.name || '',
    }
}


export default async function ProductPage (context: Props){

    const slug = context.params.product;

    return (
        <Product slug={slug} />
    )
}
