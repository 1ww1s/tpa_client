import { FC } from "react";
import classes from './delete.module.scss'
import { IProductPreview, ProductPreview, productService } from "@/src/entities/product";
import { SendDetailedData } from "@/src/features/sendDetailedData";

interface DeleteProps {
    productPreview: IProductPreview;
    selectedWidget: number;
    setSelectedWidget: (selectedWidget: number) => void;
    isLoading: boolean;
    setIsLoading: (isLoading: boolean) => void;
}

export const Delete: FC<DeleteProps> = ({productPreview, selectedWidget, setSelectedWidget, isLoading, setIsLoading}) => {
    

    return (
        <div className={classes.deleteProduct}>
            <h3>Удалить продукт</h3>
            <ProductPreview title={productPreview.title} info={productPreview.info} img={productPreview.img} />
            <div className={classes.send}>
                <SendDetailedData 
                    onEnd={() => setSelectedWidget(selectedWidget + 1)} 
                    action='delete'
                    isLoading={isLoading} 
                    setIsLoading={setIsLoading} 
                    sendData={async () => await productService.delete(productPreview.id)}
                />
            </div>
        </div>
    )
}