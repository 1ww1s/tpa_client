import ProductCatalog from "@/src/views/productCatalog/ProductCatalog";
import { Metadata, NextPage } from "next";
import React from "react";

export const metadata: Metadata = {
    title: 'Каталог продукции',
};
  

export default async function ProductCatalogPage() {


    return (
        <div>
            <ProductCatalog />
        </div>
    )
}
