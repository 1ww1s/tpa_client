import { IProductGroupItem, productGroupService } from "@/src/entities/productGroup";
import ProductGroup from "@/src/views/productGroup/ProductGroup";
import React from "react";

type Props = {
    params: { ['product-group']: string }
}
 
export const dynamicParams = true 
 
export async function generateStaticParams() {
  let productGroupItems: IProductGroupItem[] = await productGroupService.fetchNames()

  return productGroupItems.map((item) => ({
    'product-group': item.slug,
  }))
}

export async function generateMetadata({ params }: Props) {

    let productGroup: IProductGroupItem | null = null;
    try{
      productGroup = await productGroupService.fetchNameBySlug(params['product-group'])
    }
    catch(e){}

    return {
      title: productGroup?.name || '',
    }
}

export default async function ProductGroupPage(context: Props){

    const slug = context.params["product-group"];

    return (
      <ProductGroup slug={slug} />
    )
}