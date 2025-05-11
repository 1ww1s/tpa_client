import { FC } from "react";
import classes from './partnerLogo.module.scss'

interface PartnerCardProps {
    img: {name: string, value: string};
}

export const PartnerLogo: FC<PartnerCardProps> = ({img}) => {


    return (
        <div className={classes.partnerLogo}>
            <img src={img.value} alt={img.name} />
        </div>
    )
}