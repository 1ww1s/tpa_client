import { FC } from "react";
import classes from './partnerPreview.module.scss'
import { IPartner } from "../../model/types";
import Image from "next/image";

interface PartnerPreviewProps {
    partner: IPartner;
}

export const PartnerPreview: FC<PartnerPreviewProps> = ({partner}) => {


    return (
        <div className={classes.partnerPreview}>
            <div>
                {partner.name}
            </div>
            <div>
                <Image src={partner.img.value} width={200} height={200} alt={partner.img.name} />
            </div>
        </div>
    )
}