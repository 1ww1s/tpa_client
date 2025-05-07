import { certificateService, ICertificate, useCertificateActions, validationCertificate } from "@/src/entities/certificate";
import { ChangingCertificate } from "@/src/features/changingCertificate";
import { SendDetailedData } from "@/src/features/sendDetailedData";
import { UploadImageFile } from "@/src/features/uploadImage";
import { FC } from "react";

interface ChangingCertificateAndSendDataProps {
    certificate: ICertificate;
    setCertificate: (certificate: ICertificate) => void;
    action: 'create' | 'update' | 'delete';    
    isLoading: boolean;
    setIsLoading: (val: boolean) => void;
    selectedWidget: number;
    setSelectedWidget: (selectedWidget: number) => void;
    title: string;
}


export const ChangingCertificateAndSendData: FC<ChangingCertificateAndSendDataProps> = (
    {certificate, setCertificate, action, isLoading, setIsLoading, selectedWidget, setSelectedWidget, title}) => {

    const {setImg} = useCertificateActions(certificate, setCertificate)

    const handleSubmit = async () => {
        const formData = new FormData();
        if(certificate.img.file){
            formData.append("image", certificate.img.file);
        }
        formData.append("name", certificate.img.name);
        formData.append("data", JSON.stringify({...certificate, img: {name: certificate.img.name}}));
        return action === 'create' ? await certificateService.create(formData) : await certificateService.update(formData)
    };

    return (
        <div>
            <h3>{title}</h3>
            <ChangingCertificate 
                certificate={certificate}
                setCertificate={setCertificate}
                uploadImage={<UploadImageFile image={certificate.img} setImage={setImg}/>}
            />
            <hr />
            <SendDetailedData 
                action={action}
                validation={setError => validationCertificate(certificate, setError)}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
                sendData={handleSubmit}
                onEnd={() => setSelectedWidget(selectedWidget + 1)} 
            />
        </div>
    )
}