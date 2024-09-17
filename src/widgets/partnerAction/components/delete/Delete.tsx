import { FC } from "react";
import { SendDetailedData } from "@/src/features/sendDetailedData";
import { IPartner, PartnerPreview, partnerService } from "@/src/entities/partner";

interface DeleteProps {
    partner: IPartner;
    selectedWidget: number;
    setSelectedWidget: (selectedWidget: number) => void;
    isLoading: boolean;
    setIsLoading: (isLoading: boolean) => void;
}

export const Delete: FC<DeleteProps> = ({partner, selectedWidget, setSelectedWidget, isLoading, setIsLoading}) => {
    

    return (
        <div>
            <h3>Удалить партнера</h3>
            <PartnerPreview partner={partner} />
            <hr />
            <div>
                <SendDetailedData 
                    onEnd={() => setSelectedWidget(selectedWidget + 1)} 
                    action='delete'
                    isLoading={isLoading} 
                    setIsLoading={setIsLoading} 
                    sendData={async () => await partnerService.delete(partner.id)}
                />
            </div>
        </div>
    )
}