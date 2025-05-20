"use client"

import { FC, useRef, useState } from "react";
import { FullScreen } from "../fullScreen/FullScreen";
import { ICertificate } from "@/src/entities/certificate";
import { CarouselImages } from "@/src/features/carouselImages";  // версия до этого my-sliders
import { OpenFullScreen } from "@/src/features/openFullScreen";
import { ImageCard } from "@/src/entities/image";
import classes from './certificateCarousel.module.scss'
import { Arrows } from "../../../../shared/components/arrows/Arrows";
import { SliderImagesStatic } from "my-sliders";

interface CertificateCarouselProps {
    certificates: ICertificate[];
}

export const CertificateCarousel: FC<CertificateCarouselProps> = ({certificates}) => {

    const [open, setOpen] = useState<boolean>(false)
    const [currentImage, setCurrentImage] = useState<number>(0)

    const refBackward = useRef<HTMLImageElement>(null)
    const refForward = useRef<HTMLImageElement>(null)

    const onClick = (ind: number) => {
        setCurrentImage(ind)
        setOpen(true)
    }

    return (
        <div className={classes.certificateCarousel}>
            <FullScreen 
                images={certificates.map(c => c.img)} 
                currentImage={currentImage} 
                setCurrentImage={setCurrentImage} 
                open={open}
                setOpen={setOpen}
            />
            <SliderImagesStatic
                onClick={onClick}
                widthItem={240}

                ms={450}
                
                refBackward={refBackward}
                refForward={refForward}

                elements={certificates.map((certificate, ind) => 
                    <div key={ind} className={classes.certificate}>
                        <OpenFullScreen highlight open={open} key={ind} setIndex={setCurrentImage} index={ind} setOpen={setOpen} >
                            <ImageCard img={certificate.img} />
                        </OpenFullScreen>
                    </div>
                )} 
            />
            <Arrows 
                refBackward={refBackward}
                refForward={refForward}
            />
        </div>
    )
}