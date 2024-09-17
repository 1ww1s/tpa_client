import { IPartner, partnerService, usePartnerActions, validationPartner } from "@/src/entities/partner";
import { ChangingPartner } from "@/src/features/changingPartner";
import { SendDetailedData } from "@/src/features/sendDetailedData";
import { UploadImage } from "@/src/features/uploadImage";
import { FC } from "react";

interface ChangingPartnerAndSendDataProps {
    partner: IPartner;
    setPartner: (partner: IPartner) => void;
    action: 'create' | 'update' | 'delete';    
    isLoading: boolean;
    setIsLoading: (val: boolean) => void;
    selectedWidget: number;
    setSelectedWidget: (selectedWidget: number) => void;
    title: string;
}


export const ChangingPartnerAndSendData: FC<ChangingPartnerAndSendDataProps> = (
    {partner, setPartner, action, isLoading, setIsLoading, selectedWidget, setSelectedWidget, title}
) => {

    const {setImg} = usePartnerActions(partner, setPartner)

    return (
        <div>
            <h3>{title}</h3>
            <ChangingPartner 
                partner={partner}
                setPartner={setPartner}
                uploadImage={<UploadImage image={partner.img} setImage={setImg}/>}
            />
            <hr />
            <SendDetailedData 
                action={action}
                validation={setError => validationPartner(partner, setError)}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
                sendData={async () => action === 'create' ? await partnerService.create(partner) : await partnerService.update(partner)}
                onEnd={() => setSelectedWidget(selectedWidget + 1)} 
            />
        </div>
    )
}