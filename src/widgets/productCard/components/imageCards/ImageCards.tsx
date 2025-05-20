"use client"

import { ImageJust } from "@/src/entities/image";
import { OpenFullScreen } from "@/src/features/openFullScreen";
import { SwitchArrows, SwitchImages } from "@/src/features/switchImages";
import { MyFullScreen } from "@/src/shared/components/myFullScreen/MyFullScreen";
import { FC, useState } from "react";
import classes from './imageCards.module.scss'
import { IProduct } from "@/src/entities/product";
import { SliderImages } from "my-sliders";

interface ImagesCardProps {
    images: IProduct['images']
}

export const ImageCards: FC<ImagesCardProps> = ({images}) => {

    const [open, setOpen] = useState<boolean>(false)
    const [currentImage, setCurrentImage] = useState<number>(0)

    const [firstElemChange, setFirstElemChange] = useState<boolean>(true)

    const onClick = (ind: number) => {
        setOpen(true)
    } 

    return (
        <div className={classes.imageCardsBox}>
            <MyFullScreen open={open} setOpen={setOpen}>
                <SwitchArrows setFirstElemChange={setFirstElemChange} currentImage={currentImage} setCurrentImage={setCurrentImage} imagesLength={images.length}>
                    <ImageJust image={images[currentImage]} />
                </SwitchArrows>
            </MyFullScreen>
            <div className={classes.imagesCard}>
                <div className={classes.switch}>
                    <SwitchImages setFirstElemChange={setFirstElemChange} images={images} currentImage={currentImage} setCurrentImage={setCurrentImage}/>
                </div>
                <div className={classes.image}>
                    <SliderImages
                        firstElemChange={firstElemChange}
                        setFirstElemChange={setFirstElemChange}
                    
                        ms={600}
                        
                        onClick={onClick}
                    
                        setFirstElem={setCurrentImage}
                        firstElem={currentImage}
                        elements={images.map(image => 
                            <OpenFullScreen open={open} setOpen={setOpen} index={currentImage} setIndex={setCurrentImage}>
                                <ImageJust image={image} />
                            </OpenFullScreen>
                        )}
                    /> 
                </div>
            </div>
        </div>
    )
}