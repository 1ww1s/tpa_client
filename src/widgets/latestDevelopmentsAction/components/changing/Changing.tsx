import { ILatestDevelopment, latestDevelopmentsService, validationLatestDevelopment } from "@/src/entities/latestDevelopment";
import { ChangingLatestDevelopment } from "@/src/features/changingLatestDevelopment";
import { SendDetailedData } from "@/src/features/sendDetailedData";
import { UploadImageFile } from "@/src/features/uploadImage";
import { FC } from "react";

interface Props {
    latestDevelopment: ILatestDevelopment;
    setLatestDevelopment: (latestDevelopment: ILatestDevelopment) => void;
    action: 'create' | 'update' | 'delete';    
    isLoading: boolean;
    setIsLoading: (val: boolean) => void;
    selectedWidget: number;
    setSelectedWidget: (selectedWidget: number) => void;
    title: string;
}

export const Changing: FC<Props> = (
    {latestDevelopment, setLatestDevelopment, action, isLoading, setIsLoading, selectedWidget, setSelectedWidget, title}) => {

    const setImg = (img: ILatestDevelopment['img']) => {
        setLatestDevelopment({...latestDevelopment, img})
    }

    const handleSubmit = async () => {
        const formData = new FormData();
        if(latestDevelopment.img.file){
            formData.append("image", latestDevelopment.img.file);
        }
        formData.append("data", JSON.stringify({...latestDevelopment, img: {id: latestDevelopment.img.id}}));
        if(action === 'create'){
            return await latestDevelopmentsService.create(formData)
        }
        return ''
    };

    return (
        <div>
            <h3>{title}</h3>
            <ChangingLatestDevelopment
                latestDevelopment={latestDevelopment}
                setLatestDevelopment={setLatestDevelopment}
                uploadImage={ <UploadImageFile image={latestDevelopment.img} setImage={setImg}/> }
            />
            <hr />
            <SendDetailedData 
                action={action}
                validation={setError => validationLatestDevelopment(latestDevelopment, setError)}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
                sendData={handleSubmit}
                onEnd={() => setSelectedWidget(selectedWidget + 1)} 
            />
        </div>
    )
}