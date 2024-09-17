import { FC } from "react";
import classes from './ImageJust.module.scss'
import { IImage } from "../../model/types";

interface ImageJustProps {
    image:  IImage;
}

export const ImageJust: FC<ImageJustProps> = ({image}) => {


    return (
        <div className={classes.imageJust}>
            <img src={image.value} />
        </div>
    )
}