import { FC } from "react";
import classes from './fullScreen.module.scss'
import { IImage } from "@/src/entities/image/";
import { MyFullScreen } from "@/src/shared/components/myFullScreen/MyFullScreen";
import { SwitchArrows } from "@/src/features/switchImages";
import { Zoom } from "@/src/features/zoom";

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
                    <section className={classes.content}>
                        <Zoom image={images[currentImage]} />  
                    </section>
                </SwitchArrows>
            </div>
        </MyFullScreen>
    )
}