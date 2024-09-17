import { FC } from "react";
import classes from './delete.module.scss'
import { SendDetailedData } from "@/src/features/sendDetailedData";
import { ProductPreview } from "@/src/entities/product";
import { IProductGroup, productGroupService } from "@/src/entities/productGroup";

interface DeleteProps {
    productGroup: IProductGroup;
    selectedWidget: number;
    setSelectedWidget: (selectedWidget: number) => void;
    isLoading: boolean;
    setIsLoading: (isLoading: boolean) => void;
}

export const Delete: FC<DeleteProps> = ({productGroup, selectedWidget, setSelectedWidget, isLoading, setIsLoading}) => {
    

    return (
        <div className={classes.deleteProductGroup}>
            <h3>Удалить раздел продукции</h3>
            <ProductPreview title={productGroup.title} info={productGroup.info} img={productGroup.img} />
            <div className={classes.send}>
                <SendDetailedData 
                    onEnd={() => setSelectedWidget(selectedWidget + 1)} 
                    action='delete'
                    isLoading={isLoading} 
                    setIsLoading={setIsLoading} 
                    sendData={async () => await productGroupService.delete(productGroup.id)}
                />
            </div>
        </div>
    )
}