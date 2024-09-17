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
                    <Image src={latestDevelopmentPreview.img.value} width={90} height={90} alt={latestDevelopmentPreview.img.name} />
                </div>
                <div className={classes.title}>
                    <span>{latestDevelopmentPreview.name}</span>
                </div>
            </div>
    </div>
    )
}