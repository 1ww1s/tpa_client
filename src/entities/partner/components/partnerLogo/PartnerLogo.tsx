import { FC } from "react";
import classes from './partnerLogo.module.scss'
import { IPartner } from "../../model/types";
import Image from "next/image";
import { IImage } from "@/src/entities/image";

interface PartnerCardProps {
    img: IImage;
}

export const PartnerLogo: FC<PartnerCardProps> = ({img}) => {


    return (
        <div className={classes.partnerLogo}>
            <img src={img.value} alt={img.name} />
        </div>
    )
}