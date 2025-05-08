import { FC } from "react";
import { IImage } from "../../model/types";
import classes from './imageCard.module.scss'


interface ImageCardProps {
    img: IImage;
}

export const ImageCard: FC<ImageCardProps> = ({img}) => {

    return (
        <div className={classes.imageCard}>
            <img src={`${process.env.NEXT_PUBLIC_SERVER_URL_API}${img.url}`} alt={img.name} />
        </div>
    )
}