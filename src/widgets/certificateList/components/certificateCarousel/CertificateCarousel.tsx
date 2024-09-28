"use client"

import { FC, useState } from "react";
import { FullScreen } from "../fullScreen/FullScreen";
import { ICertificate } from "@/src/entities/certificate";
import { CarouselImages } from "@/src/features/carouselImages";
import { OpenFullScreen } from "@/src/features/openFullScreen";
import { ImageCard } from "@/src/entities/image";
import classes from './certificateCarousel.module.scss'

interface CertificateCarouselProps {
    certificates: ICertificate[];
}

export const CertificateCarousel: FC<CertificateCarouselProps> = ({certificates}) => {

    const [open, setOpen] = useState<boolean>(false)
    const [currentImage, setCurrentImage] = useState<number>(0)

    return (
        <div className={classes.certificateCarousel}>
            <FullScreen 
                images={certificates.map(c => c.img)} 
                currentImage={currentImage} 
                setCurrentImage={setCurrentImage} 
                open={open}
                setOpen={setOpen}
            />
            
            <CarouselImages images={certificates.map(c => c.img)} children={
                certificates.map((certificate, ind) => 
                    <div key={ind} className={classes.certificate}>
                        <OpenFullScreen highlight open={open} key={ind} setIndex={setCurrentImage} index={ind} setOpen={setOpen} >
                            <ImageCard img={certificate.img} />
                        </OpenFullScreen>
                    </div>
                )
            } />
        </div>
    )
}