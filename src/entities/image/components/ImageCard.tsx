import { FC } from "react";
import { IImage } from "../model/types";
import classes from './imageCard.module.scss'


interface ImageCardProps {
    img: IImage;
}

export const ImageCard: FC<ImageCardProps> = ({img}) => {

    return (
        <div className={classes.imageCard}>
            <img src={img.value} alt={img.name} />
        </div>
    )
}