import { FC } from "react";
import classes from './latestDevelopmentPreview.module.scss'
import { ILatestDevelopment } from "../../model/types";
import Image from "next/image";

interface LatestDevelopmentPreviewProps {
    latestDevelopmentPreview: ILatestDevelopment;
}


export const LatestDevelopmentPreview: FC<LatestDevelopmentPreviewProps> = ({latestDevelopmentPreview}) => {

    return (
        <div>
            <div className={classes.latestDevelopmentPreview}>
                <div className={classes.image}>
                    <Image 
                        src={`${process.env.NEXT_PUBLIC_SERVER_URL}${latestDevelopmentPreview.img.url ? latestDevelopmentPreview.img.url : ''}`} 
                        width={90} 
                        height={90} 
                        alt={latestDevelopmentPreview.title} 
                    />
                </div>
                <div className={classes.title}>
                    <span>{latestDevelopmentPreview.title}</span>
                </div>
            </div>
    </div>
    )
}