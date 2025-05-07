import { IProduct, productService, useProductActions, validationProduct } from "@/src/entities/product";
import { AddImgList } from "@/src/features/addImgList";
import { ChangingProduct } from "@/src/features/changingProduct";
import { SendDetailedData } from "@/src/features/sendDetailedData";
import { FC } from "react";

interface ChangingProductAndSendDataProps {
    product: IProduct;
    setProduct: (product: IProduct) => void;
    action: 'create' | 'update' | 'delete';    
    isLoading: boolean;
    setIsLoading: (val: boolean) => void;
    selectedWidget: number;
    setSelectedWidget: (selectedWidget: number) => void;
    title: string;
}

export const ChangingProductAndSendData: FC<ChangingProductAndSendDataProps> = (
    {title, product, setProduct, action, isLoading, setIsLoading, selectedWidget, setSelectedWidget}
) => {

    const {setImages} = useProductActions(product, setProduct)

    const handleSubmit = async () => {
        const formData = new FormData();
        product.images.forEach(image => {
            if(image.file){
                formData.append("images", image.file);
                formData.append("name", image.name);
            }
        })
        formData.append("data", JSON.stringify({...product, images: product.images.map(image => ({id: image.id, name: image.name}))}));
        return action === 'create' ? await productService.create(formData) : await productService.update(formData) // заменить update
    };

    return (
        <div>
            <h3>{title}</h3>
            <ChangingProduct 
                product={product}
                setProduct={setProduct}
                addImg={<AddImgList images={product.images} setImages={setImages} />}
            />
            <hr />
            <SendDetailedData 
                action={action}
                validation={setError => validationProduct(product, setError)}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
                sendData={handleSubmit}
                onEnd={() => setSelectedWidget(selectedWidget + 1)} 
            />
        </div>
    )
}