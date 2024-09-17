import { certificateService, ICertificate, useCertificateActions, validationCertificate } from "@/src/entities/certificate";
import { ChangingCertificate } from "@/src/features/changingCertificate";
import { SendDetailedData } from "@/src/features/sendDetailedData";
import { UploadImage } from "@/src/features/uploadImage";
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

    return (
        <div>
            <h3>{title}</h3>
            <ChangingCertificate 
                certificate={certificate}
                setCertificate={setCertificate}
                uploadImage={<UploadImage image={certificate.img} setImage={setImg}/>}
            />
            <hr />
            <SendDetailedData 
                action={action}
                validation={setError => validationCertificate(certificate, setError)}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
                sendData={async () => action === 'create' ? await certificateService.create(certificate) : await certificateService.update(certificate)}
                onEnd={() => setSelectedWidget(selectedWidget + 1)} 
            />
        </div>
    )
}