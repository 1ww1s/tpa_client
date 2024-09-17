import { FC, PropsWithChildren } from "react";
import classes from './arrows.module.scss'
import { Backward } from "./Backward";
import { Forward } from "./Forward";

interface SwitchArrowsProps {
    currentImage: number;
    setCurrentImage: (currentImage: number) => void;
    imagesLength: number;
}

export const SwitchArrows: FC<SwitchArrowsProps & PropsWithChildren> = ({imagesLength, currentImage, setCurrentImage, children}) => {


    return (
        <div className={classes.switchArrows}>
            <Backward currentImage={currentImage} setCurrentImage={setCurrentImage} imagesLength={imagesLength} />
            {children}
            <Forward currentImage={currentImage} setCurrentImage={setCurrentImage} imagesLength={imagesLength} />
        </div>
    )
}