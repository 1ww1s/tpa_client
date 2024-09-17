import { FC } from "react";
import { SendDetailedData } from "@/src/features/sendDetailedData";
import { CertificatePreview, certificateService, ICertificate } from "@/src/entities/certificate";

interface DeleteProps {
    certificate: ICertificate;
    selectedWidget: number;
    setSelectedWidget: (selectedWidget: number) => void;
    isLoading: boolean;
    setIsLoading: (isLoading: boolean) => void;
}

export const Delete: FC<DeleteProps> = ({certificate, selectedWidget, setSelectedWidget, isLoading, setIsLoading}) => {
    

    return (
        <div>
            <h3>Удалить сертификат</h3>
            <CertificatePreview certificate={certificate} />
            <hr />
            <div>
                <SendDetailedData 
                    onEnd={() => setSelectedWidget(selectedWidget + 1)} 
                    action='delete'
                    isLoading={isLoading} 
                    setIsLoading={setIsLoading} 
                    sendData={async () => await certificateService.delete(certificate.id)}
                />
            </div>
        </div>
    )
}