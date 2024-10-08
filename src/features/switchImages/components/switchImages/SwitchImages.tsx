import { IImage } from "@/src/entities/image";
import { FC, useRef } from "react";
import arrow from '../../lib/assets/arrow-blue.png'
import classes from './switchImages.module.scss'
import Image from "next/image";

interface SwitchImagesProps {
    images: IImage[];
    currentImage: number;
    setCurrentImage: (currentImage: number) => void;
}

export const SwitchImages: FC<SwitchImagesProps> = ({images, currentImage, setCurrentImage}) => {

    const refSlider = useRef<HTMLDivElement>(null)

    const forwardScroll = () => {
        refSlider.current?.scrollBy({
            top: -100,
            left: 0,
            behavior: 'smooth'
        })
    }
    const backwardScroll = () => {
        refSlider.current?.scrollBy({
            top: 100,
            left: 0,
            behavior: 'smooth'
        })
    }

    const chooseImage = (ind: number) => {
        setCurrentImage(ind)
    }

    return (
        <div className={classes.switchImages}>
            <img onClick={forwardScroll} className={classes.forwardScroll} src={arrow.src} />
            <div ref={refSlider} className={classes.slider}>
                {images.map((img, ind) => 
                    <Image 
                        tabIndex={1}
                        className={ind === currentImage ? classes.currentImage : ''} 
                        onClick={() => chooseImage(ind)}
                        key={ind} 
                        src={img.value} 
                        alt={img.name}
                        width={100}
                        height={100}
                    />
                )}
            </div>
            <img onClick={backwardScroll} className={classes.backwardScroll} src={arrow.src} />
        </div>
    )
}