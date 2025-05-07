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
                <Image 
                    src={`${process.env.NEXT_PUBLIC_SERVER_URL}${latestDevelopment.img.url}`} 
                    alt={latestDevelopment.title} 
                    width={240} 
                    height={240} 
                />
            </div>
            <div className={classes.title}>
                <span>{latestDevelopment.title}</span>
            </div>
        </div>
    )
}