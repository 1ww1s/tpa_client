import { IImage } from "@/src/entities/image";
import { FC, useRef } from "react";
import arrow from '../../lib/assets/arrow-blue.png'
import classes from './switchImages.module.scss'
import Image from "next/image";
import { IProduct } from "@/src/entities/product";

interface SwitchImagesProps {
    images: IProduct['images'];
    currentImage: number;
    setCurrentImage: (currentImage: number) => void;
    setFirstElemChange: (f: boolean) => void;
}

export const SwitchImages: FC<SwitchImagesProps> = ({setFirstElemChange, images, currentImage, setCurrentImage}) => {

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
        setFirstElemChange(true)
    }

    return (
        <div className={classes.switchImages}>
            <img onClick={forwardScroll} className={classes.forwardScroll} src={arrow.src} alt="Вперед" />
            <div ref={refSlider} className={classes.slider}>
                {images.map((img, ind) => 
                    <Image 
                        tabIndex={1}
                        className={ind === currentImage ? classes.currentImage : ''} 
                        onClick={() => chooseImage(ind)}
                        key={ind} 
                        src={`${process.env.NEXT_PUBLIC_SERVER_URL_API}${img.url ? img.url : ''}`} 
                        alt={img.name}
                        width={100}
                        height={100}
                    />
                )}
            </div>
            <img onClick={backwardScroll} className={classes.backwardScroll} src={arrow.src} alt="Назад" />
        </div>
    )
}