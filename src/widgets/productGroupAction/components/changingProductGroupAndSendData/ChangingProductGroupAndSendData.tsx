import { IProductGroup, productGroupService, useProductGroupActions, validationProductGroup } from "@/src/entities/productGroup";
import { ChangingProductGroup } from "@/src/features/changingProductGroup";
import { SendDetailedData } from "@/src/features/sendDetailedData";
import { UploadImage } from "@/src/features/uploadImage";
import { FC } from "react";

interface ChangingProductGroupAndSendDataProps {
    productGroup: IProductGroup;
    setProductGroup: (productGroup: IProductGroup) => void;
    action: 'create' | 'update' | 'delete';    
    isLoading: boolean;
    setIsLoading: (val: boolean) => void;
    selectedWidget: number;
    setSelectedWidget: (selectedWidget: number) => void;
    title: string;
}


export const ChangingProductGroupAndSendData: FC<ChangingProductGroupAndSendDataProps> = (
    {productGroup, setProductGroup, action, isLoading, setIsLoading, selectedWidget, setSelectedWidget, title}) => {

    const {setImg} = useProductGroupActions(productGroup, setProductGroup)

    return (
        <div>
            <h3>{title}</h3>
            <ChangingProductGroup 
                productGroup={productGroup}
                setProductGroup={setProductGroup}
                uploadImage={<UploadImage image={productGroup.img} setImage={setImg}/>}
            />
            <hr />
            <SendDetailedData 
                action={action}
                validation={setError => validationProductGroup(productGroup, setError)}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
                sendData={async () => action === 'create' ? await productGroupService.create(productGroup) : await productGroupService.update(productGroup)}
                onEnd={() => setSelectedWidget(selectedWidget + 1)} 
            />
        </div>
    )
}