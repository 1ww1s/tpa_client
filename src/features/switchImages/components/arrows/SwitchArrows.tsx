import { FC, PropsWithChildren } from "react";
import classes from './arrows.module.scss'
import { Backward } from "./Backward";
import { Forward } from "./Forward";

interface SwitchArrowsProps {
    currentImage: number;
    setCurrentImage: (currentImage: number) => void;
    imagesLength: number;
    setFirstElemChange?: (f: boolean) => void;
}

export const SwitchArrows: FC<SwitchArrowsProps & PropsWithChildren> = ({setFirstElemChange = () => {}, imagesLength, currentImage, setCurrentImage, children}) => {


    return (
        <div className={classes.switchArrows}>
            <Backward setFirstElemChange={setFirstElemChange} currentImage={currentImage} setCurrentImage={setCurrentImage} imagesLength={imagesLength} />
            {children}
            <Forward setFirstElemChange={setFirstElemChange} currentImage={currentImage} setCurrentImage={setCurrentImage} imagesLength={imagesLength} />
        </div>
    )
}