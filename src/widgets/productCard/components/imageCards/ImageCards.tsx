"use client"

import { IImage, ImageJust } from "@/src/entities/image";
import { OpenFullScreen } from "@/src/features/openFullScreen";
import { SwitchArrows, SwitchImages } from "@/src/features/switchImages";
import { MyFullScreen } from "@/src/shared/components/myFullScreen/MyFullScreen";
import { FC, useState } from "react";
import classes from './imageCards.module.scss'
import { IProduct } from "@/src/entities/product";

interface ImagesCardProps {
    images: IProduct['images']
}

export const ImageCards: FC<ImagesCardProps> = ({images}) => {

    const [open, setOpen] = useState<boolean>(false)
    const [currentImage, setCurrentImage] = useState<number>(0)

    return (
        <div>
            <MyFullScreen open={open} setOpen={setOpen}>
                    <SwitchArrows currentImage={currentImage} setCurrentImage={setCurrentImage} imagesLength={images.length}>
                        <ImageJust image={images[currentImage]} />
                    </SwitchArrows>
            </MyFullScreen>
            <div className={classes.imagesCard}>
                <div className={classes.switch}>
                    <SwitchImages images={images} currentImage={currentImage} setCurrentImage={setCurrentImage}/>
                </div>
                <div className={classes.image}> 
                    <OpenFullScreen open={open} setOpen={setOpen} index={currentImage} setIndex={setCurrentImage}>
                        <ImageJust image={images[currentImage]} />
                    </OpenFullScreen>
                </div>
            </div>
        </div>
    )
}