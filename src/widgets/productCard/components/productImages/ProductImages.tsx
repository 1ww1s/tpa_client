import { IProduct, productService } from "@/src/entities/product";
import { isDynamicServerError } from "next/dist/client/components/hooks-server-context";
import { ImageCards } from "../imageCards/ImageCards";

const getData = async (slug: string) =>  {
    let images: IProduct['images'] | null = null;
    try{
        images = await productService.fetchImages(slug)
    }
    catch(e){
        if (isDynamicServerError(e)) {
            throw e;
        }
        console.log(e)
    }
    return images
}

interface ProductImagesProps{
    slug: string;
}

export default async function ProductImages({slug}: ProductImagesProps) {

    const images = await getData(slug)

    if(!images) return <></>

    return (
        <ImageCards images={images} />
    )
}