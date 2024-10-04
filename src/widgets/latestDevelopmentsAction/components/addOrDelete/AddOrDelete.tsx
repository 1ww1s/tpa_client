import { latestDevelopmentsService } from "@/src/entities/latestDevelopment";
import { IProductPreview, ProductPreview } from "@/src/entities/product";
import { SendDetailedData } from "@/src/features/sendDetailedData";
import { FC } from "react";
import classes from './delete.module.scss'


interface AddOrDeleteProps {
    productPreview: IProductPreview;
    action: 'create' | 'delete';   
    isLoading: boolean;
    setIsLoading: (val: boolean) => void;
    selectedWidget: number;
    setSelectedWidget: (selectedWidget: number) => void;
    title: string;
}


export const AddOrDelete: FC<AddOrDeleteProps> = 
    ({title, productPreview, action, isLoading, setIsLoading, selectedWidget, setSelectedWidget}) =>
{

    return (
        <div className={classes.delete}>
            <h3>{title}</h3>
            <ProductPreview title={productPreview.title} info={productPreview.info} img={productPreview.img} />
            <hr />
            <div className={classes.send}>
                <SendDetailedData 
                    action={action}
                    isLoading={isLoading}
                    setIsLoading={setIsLoading}
                    sendData={async () => action === 'create' ? await latestDevelopmentsService.create(productPreview.id) : await latestDevelopmentsService.delete(productPreview.id)}
                    onEnd={() => setSelectedWidget(selectedWidget + 1)} 
                />
            </div>
        </div>
    )
}