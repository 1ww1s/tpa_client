import { FC } from "react";
import { ILatestDevelopment } from "../../model/types";
import classes from './latestDevelopmentCard.module.scss'
import Image from "next/image";

interface  LatestDevelopmentsCardProps {
    latestDevelopment: ILatestDevelopment;
}

export const LatestDevelopmentCard: FC<LatestDevelopmentsCardProps> = ({latestDevelopment}) => {    


    return (
        <div className={classes.latestDevelopmentsCard}>
            <div className={classes.image}>
                <Image src={latestDevelopment.img.value} alt={latestDevelopment.img.name} width={240} height={240} />
            </div>
            <div className={classes.title}>
                <span>{latestDevelopment.name}</span>
            </div>
        </div>
    )
}