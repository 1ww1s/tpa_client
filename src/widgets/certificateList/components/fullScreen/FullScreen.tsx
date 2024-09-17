import { FC } from "react";
import classes from './fullScreen.module.scss'
import { IImage, ImageJust } from "@/src/entities/image/";
import { MyFullScreen } from "@/src/shared/components/myFullScreen/MyFullScreen";
import { SwitchArrows } from "@/src/features/switchImages";

interface FullScreenProps {
    images: IImage[];
    currentImage: number;
    setCurrentImage: (currentImage: number) => void;
    open: boolean;
    setOpen: (open: boolean) => void;
}

export const FullScreen: FC<FullScreenProps> = ({open, setOpen, images, currentImage, setCurrentImage}) => {
    
    return (
        <MyFullScreen open={open} setOpen={setOpen}>
            <div className={classes.imageCard}>
                <SwitchArrows currentImage={currentImage} setCurrentImage={setCurrentImage} imagesLength={images.length}>
                    <ImageJust image={images[currentImage]} />  
                </SwitchArrows>
            </div>
        </MyFullScreen>
    )
}