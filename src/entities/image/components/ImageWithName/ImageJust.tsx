import { FC } from "react";
import classes from './ImageJust.module.scss'
import { IProduct } from "@/src/entities/product";

interface ImageJustProps {
    image: IProduct['images'][0];
}

export const ImageJust: FC<ImageJustProps> = ({image}) => {

    const src = image?.blobUrl ? image?.blobUrl : `${process.env.NEXT_PUBLIC_SERVER_URL_API}${image?.url}`;

    return (
        <div className={classes.imageJust}>
            <img 
                src={src} 
                alt={image?.name}
            />
            <span data-name={true} className={classes.name}>{image?.name}</span>
        </div>
    )
}