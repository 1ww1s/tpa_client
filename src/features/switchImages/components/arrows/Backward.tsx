import { FC } from "react";
import arrow from '../../lib/assets/arrow-blue.png'
import classes from './arrows.module.scss'

interface BackwardProps {
    currentImage: number;
    setCurrentImage: (currentImage: number) => void;
    imagesLength: number;
    setFirstElemChange?: (f: boolean) => void;
}

export const Backward: FC<BackwardProps> = (
    {imagesLength, currentImage, setFirstElemChange = () => {}, setCurrentImage}
) => {

    const backward = () => {
        setFirstElemChange(true)
        if(currentImage === 0) setCurrentImage(imagesLength - 1)
        else setCurrentImage(currentImage - 1)
    }

    return (
        <div className={classes.backward}>
            <img onClick={backward} src={arrow.src} alt="Назад" />
        </div>
    )
}