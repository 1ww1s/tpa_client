import { FC } from "react";
import arrow from '../../lib/assets/arrow-blue.png'
import classes from './arrows.module.scss'

interface ForwardProps {
    currentImage: number;
    setCurrentImage: (currentImage: number) => void;
    imagesLength: number;
    setFirstElemChange?: (f: boolean) => void;
}

export const Forward: FC<ForwardProps> = (
    {setFirstElemChange = () => {}, imagesLength, currentImage, setCurrentImage}
) => {

    const forward = () => {
        setFirstElemChange(true)
        if(currentImage === imagesLength - 1) setCurrentImage(0)
        else setCurrentImage(currentImage + 1) 
    }

    return (
        <div className={classes.forward}>
            <img onClick={forward} src={arrow.src} alt="Вперед" />
        </div>
    )
}